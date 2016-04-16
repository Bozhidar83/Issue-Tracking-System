(function() {
    angular.module('issueTrackingSystemApp')
        .controller('IssueController', [
            '$scope',
            '$location',
            '$routeParams',
            'issuesService',
            'projectsService',
            'notifyService',
            'usSpinnerService',
            function($scope, $location, $routeParams, issuesService, projectsService, notifyService, usSpinnerService) {
                $scope.createNewIssue = function(issue) {
                    usSpinnerService.spin('spinner-1');
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
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Issue "' + issue.Title + '" created successfully');
                            $location.path('#/projects/' + issue.ProjectId);
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Issue cannot be created!' + error);
                    })
                };

                $scope.editIssueForm = function(issue) {
                    // TODO:
                };

                usSpinnerService.spin('spinner-1');
                issuesService.getIssueById($routeParams.id)
                    .then(function(issue) {
                        // Get issue's project priorities
                        issue.AvailablePriorities = [];
                        projectsService.getProjectById(issue.Project.Id)
                            .then(function(issueProject) {
                                //debugger;
                                // Set available priorities from issues's project and remove current issue priority
                                issue.AvailablePriorities = issueProject.Priorities.filter(function(priority) {
                                    return priority.Name != issue.Priority.Name;
                                });
                                //issue.AvailablePriorities.splice(0, 0, issue.Priority);
                                issue.AvailablePriorities.push(issue.Priority);

                                // Parse issue due date
                                issue.DueDate = new Date(issue.DueDate);

                                // Convert issue labels in form, suitable for editing
                                issue.LabelsAsString = '';
                                for (var i = 0; i < issue.Labels.length; i++) {
                                    if (i < issue.Labels.length - 1) {
                                        issue.LabelsAsString += issue.Labels[i].Name + ',';
                                    } else {
                                        issue.LabelsAsString += issue.Labels[i].Name;
                                    }
                                }

                                // Just for test purposes
                                //issue.OldPriority = issue.Priority;

                                usSpinnerService.stop('spinner-1');
                                $scope.currentIssue = issue;
                                debugger;
                            });
                    }, function(error) {
                        // TODO: Global error handling
                        debugger;
                    });

                // TODO: FIX POSSIBLE BUG: Weather current project is really selected one ot when select from dropdown to choose correctly
                // Get all priorities for selected project
                if ($routeParams.id) {
                    usSpinnerService.spin('spinner-1');
                    projectsService.getProjectById($routeParams.id)
                        .then(function(project) {
                            usSpinnerService.stop('spinner-1');
                            $scope.currentProject = project;
                        });
                }
            }
        ])
})();