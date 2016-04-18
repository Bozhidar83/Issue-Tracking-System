(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('projectsService', [
            '$http',
            '$q',
            'authService',
            'issuesService',
            'BASE_URL',
            '_',
            function ProjectService($http, $q, authService, issuesService, BASE_URL, _) {
                var MAX_USER_ISSUES = 10000000;
                function getAllProjects() {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                // Get project issues by Id
                function getProjectIssuesById(projectId) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects/' + projectId + '/issues')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function createProject(project) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'projects', project, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(responce) {
                            deferred.resolve(responce.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function updateProject(project, id) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'projects/' + id, project, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getProjectById(id) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects/' + id)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getProjectsWithPaging(params) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getProjectsByLeaderId(leaderId, params) {
                    var deferred = $q.defer();
                    //debugger;
                    $http.get(BASE_URL + 'projects?filter=Lead.Id="'+ leaderId + '"&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage)
                        .then(function(response) {
                            //debugger;
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getUserAffiliatedProjects(params) {
                    var deferred = $q.defer();

                    authService.identity()
                        .then(function(user) {
                            getProjectsByLeaderId(user.Id, params)
                                .then(function(projects) {
                                    //debugger;
                                    var userProjectsInRoleLeader = projects.Projects;
                                    userProjectsInRoleLeader = _.uniqBy(userProjectsInRoleLeader, 'Id');

                                    // Get all projects in which current user has assigned issue
                                    var issuesParams = {
                                        'startPage': 1,
                                        'pageSize': MAX_USER_ISSUES
                                    };
                                    //debugger;
                                    issuesService.getUserRelatedIssues(issuesParams)
                                        .then(function(issues) {
                                            //debugger;
                                            var userRelatedProjectsByAssignedIssues = issues.Issues.map(function (issue) {
                                                return issue.Project;
                                            });

                                            userRelatedProjectsByAssignedIssues = _.uniqBy(userRelatedProjectsByAssignedIssues, 'Id');

                                            deferred.resolve(_.uniqBy(_.concat(userProjectsInRoleLeader, userRelatedProjectsByAssignedIssues), 'Id'));
                                        }, function(error) {
                                            deferred.reject(error);
                                        });
                                });
                        });

                    return deferred.promise;
                }

                return {
                    getAllProjects: getAllProjects,
                    getProjectIssuesById: getProjectIssuesById,
                    createProject: createProject,
                    getProjectById: getProjectById,
                    updateProject: updateProject,
                    getProjectsWithPaging: getProjectsWithPaging,
                    getProjectsByLeaderId: getProjectsByLeaderId,
                    getUserAffiliatedProjects: getUserAffiliatedProjects
                }
            }
        ]);
})();