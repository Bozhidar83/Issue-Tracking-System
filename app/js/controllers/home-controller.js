(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('HomeController', [
            '$scope',
            'projectsService',
            'issuesService',
            'notifyService',
            'authService',
            'usSpinnerService',
            'PAGE_SIZE',
            function HomeController($scope, projectsService, issuesService, notifyService, authService, usSpinnerService, PAGE_SIZE) {
                // Get all user related issues
                $scope.issuesParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE
                };
                $scope.getAllUserRelatedIssues = function() {
                    usSpinnerService.spin('spinner-1');
                    issuesService.getUserRelatedIssues($scope.issuesParams)
                        .then(function(userIssues) {
                            //debugger;
                            usSpinnerService.stop('spinner-1');
                            $scope.userRelatedIssues = userIssues;
                            $scope.allIssues = userIssues.TotalPages * $scope.issuesParams.pageSize;
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                        });
                };

                $scope.getAllUserRelatedIssues();


                // Get all user related projects
                $scope.userProjects = [];
                $scope.userProjectsParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE
                };
                $scope.getUserRelatedProjects = function() {
                        usSpinnerService.spin('spinner-1');
                        projectsService.getUserAffiliatedProjects($scope.userProjectsParams)
                            .then(function(projects) {
                                usSpinnerService.stop('spinner-1');
                                $scope.userProjects = projects;
                            }, function(error) {
                                usSpinnerService.stop('spinner-1');
                            });
                    /*projectsService.getProjectsByLeaderId(user.Id, $scope.userProjectsParams)
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
                                    debugger;
                                    userRelatedProjectsByAssignedIssues = _.uniqBy(userRelatedProjectsByAssignedIssues, 'Id');

                                    debugger;
                                    $scope.userProjects = _.concat(userProjectsInRoleLeader, userRelatedProjectsByAssignedIssues);
                                    debugger;
                                });
                        });*/
                };

                $scope.getUserRelatedProjects();
            }
        ]);
})();