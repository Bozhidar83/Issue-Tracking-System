(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .controller('UserController', [
            '$scope',
            '$location',
            'userProfileService',
            'notifyService',
            function UserController($scope, $location, userProfileService, notifyService) {
                $scope.editPassword = function(user, editPasswordForm) {
                    if (editPasswordForm.$valid) {
                        userProfileService.editPassword(user)
                            .then(function() {
                                notifyService.showInfo('Password changed successfully');
                                $location.path('#/profile');
                            }, function(error) {
                                notifyService.showError('Password has not been changed', error);
                            });
                    }
                };

                $scope.makeAdmin = function(newAdmin) {
                    //debugger;
                    userProfileService.makeAdmin(newAdmin)
                        .then(function() {
                            notifyService.showInfo('User role successfully changed to "Admin"')
                        }, function(error) {
                            notifyService.showError('Cannot grant "Admin" privileges!', error)
                        });
                }
            }
        ])
})();