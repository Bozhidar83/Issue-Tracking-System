(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('RegisterController', [
            '$scope',
            '$location',
            'authService',
            'notifyService',
            'usSpinnerService',
            function RegisterController($scope, $location, authService, notifyService, usSpinnerService) {
                $scope.register = function(user) {
                    usSpinnerService.spin('spinner-1');
                    authService.register(user)
                        .then(function() {
                            notifyService.showInfo('User registered successfully');
                            user.username = user.email;
                            authService.login(user);
                            $location.path('#/');
                            usSpinnerService.stop('spinner-1');
                        }, function(error) {
                            notifyService.showError("User registration failed", error);
                            usSpinnerService.stop('spinner-1');
                        });
                }
            }
        ]);
})();