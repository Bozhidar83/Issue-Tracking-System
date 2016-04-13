(function() {
    'use strict';

    angular.module('issueTrackingSystemApp')
        .controller('LoginController', [
            '$scope',
            '$location',
            'authService',
            'notifyService',
            function LoginController($scope, $location, authService, notifyService) {
                $scope.login = function(user, loginForm) {
                    if (loginForm.$valid) {
                        authService.login(user)
                            .then(function() {
                                notifyService.showInfo('Login successful');
                                $location.path('#/');
                            }, function(error) {
                                notifyService.showError("Login failed", error);
                            });
                    }
                };
            }
        ]);
})();