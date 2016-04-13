(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('RegisterController', [
            '$scope',
            '$location',
            'authService',
            'notifyService',
            function RegisterController($scope, $location, authService, notifyService) {
                $scope.register = function(user, registerForm) {
                    if (registerForm.$valid) {
                        authService.register(user)
                            .then(function() {
                                notifyService.showInfo('User registered successfully');
                                user.username = user.email;
                                authService.login(user);
                                $location.path('#/');
                            }, function(error) {
                                notifyService.showError("User registration failed", error);
                            });
                    }
                }
            }
        ]);
})();