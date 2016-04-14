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
                // Get all projects in the system
                projectsService.getAllProjects()
                    .then(function(allProjects) {
                        $scope.allProjects = allProjects;
                    });

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

                // Get all priorities for selected project
                if ($routeParams.id) {
                    projectsService.getProjectById($routeParams.id)
                        .then(function(project) {
                            //debugger;
                            /*var labels = project.Labels;
                            var i = 0;
                            if (labels.length > 0 ) {
                                var labelsAsString = '';
                                for (i = 0; i < labels.length; i++) {
                                    if (i < labels.length - 1) {
                                        labelsAsString += labels[i].Name + ',';
                                    } else {
                                        labelsAsString += labels[i].Name;
                                    }
                                }
                            }
                            project.Labels = labelsAsString;
                            project.LabelsAsArray = labels;

                            var priorities = project.Priorities;
                            var prioritiesAsString = '';
                            for (i = 0; i < priorities.length; i++) {
                                if (i < priorities.length - 1) {
                                    prioritiesAsString += priorities[i].Name + ',';
                                } else {
                                    prioritiesAsString += priorities[i].Name;
                                }

                            }
                            project.Priorities = prioritiesAsString;*/

                            // Get project issues
                            /*project.Issues = [];
                            projectsService.getProjectIssuesById(project.Id)
                                .then(function(projectIssues) {
                                    project.Issues = projectIssues;
                                });*/
                            //debugger;
                            $scope.currentProject = project;
                        });
                }
            }
        ])
})();