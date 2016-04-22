(function() {
    'use strict';

    angular.module('issueTrackingSystemApp')
        .controller('LoginController', [
            '$scope',
            '$location',
            'authService',
            'notifyService',
            'usSpinnerService',
            function LoginController($scope, $location, authService, notifyService, usSpinnerService) {
                $scope.login = function(user) {
                    usSpinnerService.spin('spinner-1');
                    authService.login(user)
                        .then(function() {
                            notifyService.showInfo('Login successful');
                            $location.path('#/');
                            usSpinnerService.stop('spinner-1');
                        }, function(error) {
                            notifyService.showError("Login failed", error);
                            usSpinnerService.stop('spinner-1');
                        });
                };
            }
        ]);
})();