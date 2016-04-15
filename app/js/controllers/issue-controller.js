(function() {
    angular.module('issueTrackingSystemApp')
        .controller('IssueController', [
            '$scope',
            '$location',
            '$routeParams',
            'issuesService',
            'projectsService',
            'notifyService',
            function($scope, $location, $routeParams, issuesService, projectsService, notifyService) {
                $scope.createNewIssue = function(issue) {
                    // Set labels in accepted from back-end form
                    if (issue.Labels) {
                        var labels = issue.Labels.split(',');
                        delete issue.Labels;
                        issue.Labels = [];
                        for (i = 0; i < labels.length; i++) {
                            issue.Labels[i] = {
                                Name: labels[i]
                            };
                        }
                    }
                    issuesService.createIssue(issue)
                        .then(function(response) {
                            notifyService.showInfo('Issue "' + issue.Title + '" created successfully');
                            $location.path('#/projects/' + issue.ProjectId);
                        }, function(error) {
                            notifyService.showError('Issue cannot be created!' + error);
                    })
                };

                issuesService.getIssueById($routeParams.id)
                    .then(function(issue) {
                        $scope.currentIssue = issue;
                    }, function(error) {
                        // TODO: Global error handling
                        debugger;
                    });

                // TODO: FIX POSSIBLE BUG: Weather current project is really selected one ot when select from dropdown to choose correctly
                // Get all priorities for selected project
                if ($routeParams.id) {
                    projectsService.getProjectById($routeParams.id)
                        .then(function(project) {
                            $scope.currentProject = project;
                        });
                }
            }
        ])
})();