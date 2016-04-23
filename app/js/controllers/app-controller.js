(function() {
    'use strict';
    // The AppController holds the presentation logic for the entire app (common for all screens)
    angular.module('issueTrackingSystemApp')
        .controller('AppController', [
            '$scope',
            '$location',
            'authService',
            'userProfileService',
            'projectsService',
            'identity',
            'notifyService',
            'usSpinnerService',
            'PAGE_SIZE',
            'CURRENT_PAGE',
            function AppController($scope, $location, authService, userProfileService, projectsService, identity, notifyService, usSpinnerService, PAGE_SIZE, CURRENT_PAGE) {
                // Put the authService in the $scope to make it accessible from all screens
                $scope.authService = authService;

                $scope.predicate = 'DueDate';
                $scope.reverse = true;
                $scope.order = function(predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };

                $scope.resetPagingParams = function() {
                    $scope.customPagingParams = {
                        pageSize: PAGE_SIZE,
                        currentPage: CURRENT_PAGE,
                        collection: [],
                        numberOfPages: 0
                    };
                };
                $scope.resetPagingParams();

                $scope.labelToBeAdded = '';

                // To choose from drop down when create new project or add new issue
                function getAllUsers () {
                    if (authService.isAuthenticated()) {
                        userProfileService.getAllUsers()
                            .then(function(users) {
                                
                                $scope.allUsers = users.sort(function(a, b) {
                                    return a.Username.localeCompare(b.Username);
                                });
                            });
                    }
                }

                getAllUsers();

                // Get all projects in the system
                function getAllProjects() {
                    if (authService.isAuthenticated()) {
                        projectsService.getAllProjects()
                            .then(function(allProjects) {
                                $scope.allProjects = allProjects.sort(function(a, b) {
                                    return a.Id < b.Id;
                                });
                            });
                    }
                }

                getAllProjects();

                waitForLogin();

                $scope.logout = function() {
                    $scope.currentLoggedInUser = undefined;
                    authService.logout();
                    notifyService.showInfo('Logout successful');
                    waitForLogin();
                    $location.path('#/');
                };

                function waitForLogin() {
                    identity.getUser()
                        .then(function(user) {
                            $scope.currentLoggedInUser = user;
                        });
                }

                $scope.footerYear = new Date();
            }]
        );
})();