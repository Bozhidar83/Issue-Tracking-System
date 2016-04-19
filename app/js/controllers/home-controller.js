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
                    //debugger;
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
                    'pageSize': PAGE_SIZE * 2
                };
                $scope.getUserRelatedProjects = function() {
                        usSpinnerService.spin('spinner-1');
                        projectsService.getUserAffiliatedProjects($scope.userProjectsParams)
                            .then(function(projects) {
                                //debugger;
                                usSpinnerService.stop('spinner-1');
                                $scope.userProjects = projects;
                            }, function(error) {
                                usSpinnerService.stop('spinner-1');
                            });
                };

                $scope.getUserRelatedProjects();
            }
        ]);
})();