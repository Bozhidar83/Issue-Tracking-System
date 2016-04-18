(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('projectsService', [
            '$http',
            '$q',
            'BASE_URL',
            function ProjectService($http, $q, BASE_URL) {
                // TODO: Get all projects related to user
                function getUserRelatedProjects() {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'projects')
                        .then(function(response) {
                            //debugger;
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                // TODO: Combine 'getAllProjects' and 'getUserRelatedProjects' into one function
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

                return {
                    getUserRelatedProjects: getUserRelatedProjects,
                    getProjectIssuesById: getProjectIssuesById,
                    getAllProjects: getAllProjects,
                    createProject: createProject,
                    getProjectById: getProjectById,
                    updateProject: updateProject,
                    getProjectsWithPaging: getProjectsWithPaging
                }
            }
        ]);
})();