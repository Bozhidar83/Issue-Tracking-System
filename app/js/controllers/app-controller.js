(function() {
    'use strict';
    // The AppController holds the presentation logic for the entire app (common for all screens)
    angular.module('issueTrackingSystemApp')
        .controller('AppController', [
            '$scope',
            '$location',
            'authService',
            'identity',
            'notifyService',
            function AppController($scope, $location, authService, identity, notifyService) {
                // Put the authService in the $scope to make it accessible from all screens
                $scope.authService = authService;

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
                            //debugger
                            $scope.currentLoggedInUser = user;
                        });
                }

                $scope.footerYear = new Date();
            }]
        );
})();