(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('userProfileService', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function editPassword(user) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/ChangePassword', user, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function() {
                            deferred.resolve();
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getAllUsers() {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'users/')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function makeAdmin(newAdmin) {
                    var deferred = $q.defer();
                    //debugger;
                    $http.put(BASE_URL + 'users/makeadmin', newAdmin, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            //debugger;
                            // This just can return 'true'
                            deferred.resolve(response);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return {
                    editPassword: editPassword,
                    getAllUsers: getAllUsers,
                    makeAdmin: makeAdmin
                }
            }
        ])
})();