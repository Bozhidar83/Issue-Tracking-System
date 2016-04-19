(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('ProjectController', [
            '$scope',
            '$location',
            '$routeParams',
            '$timeout',
            'projectsService',
            'labelsService',
            'userProfileService',
            'notifyService',
            'usSpinnerService',
            'PAGE_SIZE',
            function ProjectController($scope, $location, $routeParams, $timeout, projectsService, labelsService, userProfileService, notifyService, usSpinnerService, PAGE_SIZE) {
                $scope.project = {
                    Labels: []
                };

                $scope.getLabels = function() {
                    var params = {
                        filter: $scope.labelToBeAdded ? $scope.labelToBeAdded : ''
                    };
                    labelsService.getLabels(params)
                        .then(function(response) {
                            $scope.labels = response;
                        });
                };

                $scope.addLabel = function(label) {
                    $scope.project.Labels.push({Name: label});
                    $scope.labelToBeAdded = '';
                    notifyService.showInfo('Label added successfully')
                };

                $scope.removeLabel = function(label) {
                    var indexOfTheLabel = $scope.project.Labels.indexOf(label);
                    $scope.project.Labels.splice(indexOfTheLabel, 1);
                    notifyService.showInfo('Label removed successfully');
                };

                $scope.createNewProject = function(project) {
                    usSpinnerService.spin('spinner-1');
                    //debugger;
                    // Set priorities in accepted from back-end form
                    var reformattedPriorities = project.Priorities.split(',').map(function(priority) {
                        return {
                            Name: priority.trim()
                        }
                    });
                    project.Priorities = reformattedPriorities;
                    //debugger;
                    projectsService.createProject(project)
                        .then(function(response) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Project "' + project.Name + '" created successfully');
                            $location.path('#/projects');
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Project creation failed!' + error);
                        })
                };

                if ($routeParams.id) {
                    usSpinnerService.spin('spinner-1');
                    projectsService.getProjectById($routeParams.id)
                        .then(function(project) {
                            //debugger;
                            var labels = project.Labels;
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
                            project.Priorities = prioritiesAsString;

                            // Get project issues
                            project.Issues = [];
                            projectsService.getProjectIssuesById(project.Id)
                                .then(function(projectIssues) {
                                    project.Issues = projectIssues;
                                });
                            //debugger;
                            usSpinnerService.stop('spinner-1');
                            $scope.currentProject = project;
                        });
                }

                $scope.editProject = function(project) {
                    usSpinnerService.spin('spinner-1');
                    //debugger;
                    // set priorities
                    var priorities = project.Priorities.split(',');
                    project.priorities = [];
                    delete project.Priorities;
                    var i = 0;
                    for (i = 0; i < priorities.length; i++) {
                        project.priorities[i] = {
                            Name: priorities[i]
                        };
                    }

                    // set labels
                    if (project.Labels) {
                        var labels = project.Labels.split(',');
                        delete project.Labels;
                        project.labels = [];
                        for (i = 0; i < labels.length; i++) {
                            project.labels[i] = {
                                Name: labels[i]
                            };
                        }
                    }

                    if (!project.hasOwnProperty('LeadId') && project.hasOwnProperty('Lead')) {
                        project.LeadId = project.Lead.Id;
                        delete project.Lead;
                    }

                    //debugger;
                    projectsService.updateProject(project, $routeParams.id)
                        .then(function(response) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Project "' + project.Name + '" edited successfully');
                            $location.path('#/projects');
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Project cannot be edited!' + error);
                        })
                };

                // Paging on 'All Projects' page
                $scope.projectParams = {
                    'startPage': 1,
                    'pageSize': PAGE_SIZE //* 2 - 1
                };

                $scope.getProjects = function() {
                    projectsService.getProjectsWithPaging($scope.projectParams)
                        .then(function(data) {
                            //debugger;
                            $scope.totalProjects = data.TotalPages * $scope.projectParams.pageSize;
                            $scope.allProjects = data.Projects;
                        });
                };

                $scope.getProjects();
            }
        ]);
})();