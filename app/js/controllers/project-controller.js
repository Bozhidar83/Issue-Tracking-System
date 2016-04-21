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
            'helperService',
            'PAGE_SIZE',
            'CURRENT_PAGE',
            function ProjectController($scope, $location, $routeParams, $timeout, projectsService, labelsService, userProfileService, notifyService, usSpinnerService, helperService, PAGE_SIZE, CURRENT_PAGE) {
                $scope.project = {
                    Labels: []
                };

                // Reset current page
                $scope.customPagingParams.currentPage = CURRENT_PAGE;

                $scope.project.Issues = [];

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

                    // Set priorities in accepted from back-end form
                    var reformattedPriorities = project.Priorities.split(',').map(function(priority) {
                        return {
                            Name: priority.trim()
                        }
                    });
                    project.Priorities = reformattedPriorities;

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
                            $scope.project = project;
                            $scope.project.PrioritiesArr = $scope.project.Priorities.map(function(priority) {
                                return priority.Name;
                            });
                            $scope.project.projectPriorities = $scope.project.PrioritiesArr.join(',');
                            $scope.getProjectIssues();
                            //debugger;
                            // IMPORTANT! DO NOT DELETE!
                            /*projectsService.getProjectIssuesById(project.Id)
                                .then(function(projectIssues) {
                                    $scope.project.Issues = projectIssues;
                                    usSpinnerService.stop('spinner-1');
                                });*/
                        });
                }

                // Get all project issues
                $scope.getProjectIssues = function() {
                    usSpinnerService.spin('spinner-1');
                    projectsService.getProjectIssuesById($routeParams.id)
                        .then(function(projectIssues) {
                            $scope.project.Issues = projectIssues;
                            $scope.customPagingParams.collection = projectIssues;
                            $scope.customPagingParams.numberOfPages = helperService.numberOfPages(projectIssues.length, PAGE_SIZE);

                            usSpinnerService.stop('spinner-1');
                        });
                };

                // Edit project
                $scope.editProject = function(project) {
                    usSpinnerService.spin('spinner-1');
                    //debugger;
                    // set priorities
                    project.Priorities = project.projectPriorities.split(',').map(function(priority) {
                        return {
                            Name: priority.trim()
                        };
                    });

                    project.LeadId = project.Lead.Id;

                    //debugger;
                    projectsService.updateProject(project, $routeParams.id)
                        .then(function(response) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showInfo('Project "' + project.Name + '" edited successfully');
                            $location.path('#/projects');
                        }, function(error) {
                            usSpinnerService.stop('spinner-1');
                            notifyService.showError('Project cannot be edited!', error.message);
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