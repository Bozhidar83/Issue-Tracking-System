(function () {
    'use strict';

    angular
        .module('issueTrackingSystemApp')
        .factory('identity', [
            '$q',
            function identityService($q) {
                // Current user if any property exist
                var currentUser = {};
                var deferred = $q.defer();

                return {
                    getUser: function () {
                        if (this.isAuthenticated()) {
                            return $q.resolve(currentUser);
                        }

                        return deferred.promise;
                    },
                    isAuthenticated: function () {
                        return Object.getOwnPropertyNames(currentUser).length !== 0;
                    },
                    setUser: function (user) {
                        currentUser = user;
                        deferred.resolve(user);
                    },
                    removeUser: function () {
                        currentUser = {};
                        deferred = $q.defer();
                    }
                };
            }
        ]);
}());