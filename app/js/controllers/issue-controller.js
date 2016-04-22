(function() {
    angular.module('issueTrackingSystemApp')
        .controller('IssueController', [
            '$scope',
            '$location',
            '$routeParams',
            '$route',
            'issuesService',
            'projectsService',
            'notifyService',
            'labelsService',
            'usSpinnerService',
            'helperService',
            function($scope, $location, $routeParams, $route, issuesService, projectsService, notifyService, labelsService, usSpinnerService, helperService) {
                $scope.issue = {
                    Labels: []
                };
                $scope.priorities = [];

                // Get priorities for chosen project
                $scope.getPrioritiesForProject = function (project) {
                    $scope.priorities = project.Priorities;
                    $scope.issue.priority = $scope.priorities[0];
                };

                $scope.getLabels = function() {
                    usSpinnerService.spin('spinner-1');
                    var params = {
                        filter: $scope.labelToBeAdded ? $scope.labelToBeAdded : ''
                    };
                    labelsService.getLabels(params)
                        .then(function (labelsFromSystem) {
                            $scope.labels = labelsFromSystem;
                            usSpinnerService.stop('spinner-1');
                        });
                };

                $scope.addLabel = function(label) {
                    usSpinnerService.spin('spinner-1');
                    $scope.issue.Labels.push({Name: label});
                    $scope.labelToBeAdded = '';
                    notifyService.showInfo('Label added successfully');
                    usSpinnerService.stop('spinner-1');
                };

                $scope.removeLabel = function (label) {
                    usSpinnerService.spin('spinner-1');
                    var indexOfLabelForRemove = $scope.issue.Labels.indexOf(label);
                    $scope.issue.Labels.splice(indexOfLabelForRemove, 1);
                    notifyService.showInfo('Label removed successfully');
                    usSpinnerService.stop('spinner-1');
                };

                $scope.createNewIssue = function(issue) {
                    usSpinnerService.spin('spinner-1');
                    issue.PriorityId = issue.priority.Id;
                    issue.ProjectId = issue.Project.Id;

                    issuesService.createIssue(issue)
                        .then(function(response) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Issue "' + issue.Title + '" created successfully');
                            $location.path('#/projects/' + issue.ProjectId);
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Issue cannot be created!' + error.message);
                    })
                };

                $scope.editIssue = function(issue) {
                    usSpinnerService.spin('spinner-1');
                    issue.AssigneeId = issue.Assignee.Id;
                    issue.PriorityId = issue.Priority.Id;
                    issuesService.updateIssue(issue, $routeParams.id)
                        .then(function(response) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Issue "' + issue.Title + '" edited successfully');
                            $location.path('#/issues/' + $routeParams.id);
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Issue cannot be edited!' + error.message);
                        });
                };

                $scope.getIssueById = function() {
                    if ($route.current.$$route.originalPath.indexOf('add-issue') > -1) {
                        return;
                    }
                    usSpinnerService.spin('spinner-1');
                    issuesService.getIssueById($routeParams.id)
                        .then(function(issue) {
                            //debugger;
                            $scope.issue = issue;

                            // Parse issue due date
                            $scope.issue.DueDate = helperService.parseDate($scope.issue.DueDate);

                            // Get issue's project priorities
                            projectsService.getProjectById(issue.Project.Id)
                                .then(function(issueProject) {
                                    //debugger;
                                    $scope.priorities = issueProject.Priorities;
                                    $scope.issue.ProjectLeadId = issueProject.Lead.Id;
                                    $scope.issue.priority = $scope.priorities.filter(function (priority) {
                                        return priority.Id === $scope.issue.Priority.Id;
                                    })[0];

                                    usSpinnerService.stop('spinner-1');
                                });
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                        });
                };

                $scope.getIssueById();

                $scope.changeStatus = function (statusId) {
                    usSpinnerService.spin('spinner-1');
                    issuesService.changeStatus($routeParams.id, statusId)
                        .then(function(response) {
                            $route.reload();
                            notifyService.showInfo('Issue status changed successfully!');
                            usSpinnerService.stop('spinner-1');
                        }, function(error) {
                            notifyService.showError('Cannot change status!', error.message);
                            usSpinnerService.stop('spinner-1');
                        });
                };

                $scope.addNewComment = function(comment) {
                    usSpinnerService.spin('spinner-1');
                    issuesService.addComment(comment, $route.current.params.id)
                        .then(function(response) {
                            getComments();
                            notifyService.showInfo('Comment added successfully');
                            usSpinnerService.stop('spinner-1');
                        }, function(error) {
                            notifyService.showError('Cannot add comment!', error.message);
                            usSpinnerService.stop('spinner-1');
                        });
                };

                function getComments() {
                    usSpinnerService.spin('spinner-1');
                    issuesService.getComments($route.current.params.id)
                        .then(function(issueComments) {
                            $scope.comments = issueComments;
                            usSpinnerService.stop('spinner-1');
                        });
                }

                getComments();
            }
        ])
})();