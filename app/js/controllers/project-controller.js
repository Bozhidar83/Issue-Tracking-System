(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('ProjectController', [
            '$scope',
            '$location',
            '$routeParams',
            '$uibModal',
            'projectsService',
            'userProfileService',
            'notifyService',
            function ProjectController($scope, $location, $routeParams, $uibModal, projectsService, userProfileService, notifyService) {
                projectsService.getAllProjects()
                    .then(function(projects) {
                        $scope.allProjects = projects;
                    });

                userProfileService.getAllUsers()
                    .then(function(users) {
                        $scope.allUsers = users;
                    });

                $scope.createNewProject = function(project) {
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

                    //debugger;
                    projectsService.createProject(project)
                        .then(function(response) {
                            notifyService.showInfo('Project "' + project.Name + '" created successfully');
                            $location.path('#/projects');
                        }, function(error) {
                            notifyService.showError('Project creation failed!' + error);
                        })
                };

                if ($routeParams.id) {
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

                            $scope.currentProject = project;
                        });
                }

                $scope.editProject = function(project) {
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
                            notifyService.showInfo('Project "' + project.Name + '" edited successfully');
                            $location.path('#/projects');
                        }, function(error) {
                            notifyService.showError('Project cannot be edited!' + error);
                        })
                };
            }
        ]);


    // TEST MODAL WINDOW
    /*angular.module('issueTrackingSystemApp').controller('ModalDemoCtrl', function ($scope, $uibModal) {

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result
                .then(function (selectedItem) {
                $scope.selected = selectedItem;
            });
        };
    });*/

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

    /*angular.module('issueTrackingSystemApp')
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });*/
})();