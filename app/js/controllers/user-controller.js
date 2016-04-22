(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('UserController', [
            '$scope',
            '$location',
            'userProfileService',
            'notifyService',
            'usSpinnerService',
            function UserController($scope, $location, userProfileService, notifyService, usSpinnerService) {
                $scope.editPassword = function(user, editPasswordForm) {
                    if (editPasswordForm.$valid) {
                        usSpinnerService.spin('spinner-1');
                        userProfileService.editPassword(user)
                            .then(function() {
                                notifyService.showInfo('Password changed successfully');
                                $location.path('#/profile');
                                usSpinnerService.stop('spinner-1');
                            }, function(error) {
                                notifyService.showError('Password has not been changed', error);
                                usSpinnerService.stop('spinner-1');
                            });
                    }
                };

                $scope.makeAdmin = function(newAdmin) {
                    usSpinnerService.spin('spinner-1');
                    userProfileService.makeAdmin(newAdmin)
                        .then(function() {
                            notifyService.showInfo('User role successfully changed to "Admin"');
                            usSpinnerService.stop('spinner-1');
                        }, function(error) {
                            notifyService.showError('Cannot grant "Admin" privileges!', error);
                            usSpinnerService.stop('spinner-1');
                        });
                };

                $scope.notAvailableFeature = function() {
                    notifyService.showInfo('Not Available Feature');
                }
            }
        ])
})();