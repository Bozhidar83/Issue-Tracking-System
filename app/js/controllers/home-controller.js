(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('HomeController', [
            '$scope',
            'projectsService',
            'issuesService',
            'notifyService',
            'usSpinnerService',
            'PAGE_SIZE',
            function HomeController($scope, projectsService, issuesService, notifyService, usSpinnerService, PAGE_SIZE) {
                $scope.userRelatedProjects = null;

                // Get all user related issues
                $scope.issuesParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE
                };
                $scope.getUserRelatedIssues = function() {
                    usSpinnerService.spin('spinner-1');
                    issuesService.getUserRelatedIssues($scope.issuesParams)
                        .then(function(userIssues) {
                            //debugger;
                            usSpinnerService.stop('spinner-1');
                            $scope.userRelatedIssues = userIssues;
                            $scope.allIssues = userIssues.TotalPages * $scope.issuesParams.pageSize;
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError(error.message);
                        });
                };

                $scope.getUserRelatedIssues();

                // Get all user related projects
                $scope.userProjects = [];
                projectsService.getUserRelatedProjects()
                    .then(function(allProjects) {
                        //debugger;
                        angular.forEach(allProjects, function(project){
                            if(project.Lead.Username == $scope.currentLoggedInUser.Username){
                               //debugger;
                                $scope.userProjects.push(project);
                                //console.log($scope.userProjects);
                            } else {
                                //debugger
                                // Get issues for current project
                                projectsService.getProjectIssuesById(project.Id)
                                    .then(function(allProjectIssues) {
                                        //debugger
                                        angular.forEach(allProjectIssues, function(issue) {
                                            if (issue.Assignee.Username == $scope.currentLoggedInUser.Username) {
                                                //debugger
                                                var projectNames = $scope.userProjects.forEach(function(project) {
                                                    return project.Name;
                                                });
                                                if (projectNames && !projectNames.contains(project.Name)) {
                                                    $scope.userProjects.push(project);
                                                    //console.log($scope.userProjects);
                                                }
                                                /*if (!$scope.userProjects.contains(project)) {
                                                    $scope.userProjects.push(project)
                                                }*/
                                            }
                                        })
                                    })
                            }
                        });
                    });
                //setInterval(console.log(userProjects), 6000);
                //console.log(userProjects);
                //debugger;
            }
        ]);
})();