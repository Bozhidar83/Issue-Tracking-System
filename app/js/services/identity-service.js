(function () {
    'use strict';

    var identityService = function identityService($q) {
        var currentUser = {}; // Current user if any property exist
        var deferred = $q.defer();

        return {
            getUser: function () {
                if (this.isAuthenticated()) {
                    //debugger;
                    return $q.resolve(currentUser);
                }

                return deferred.promise;
            },
            isAuthenticated: function () {
                return Object.getOwnPropertyNames(currentUser).length !== 0;
            },
            /*isAdmin: function() {
                // TODO:
                return currentUser.roles.indexOf('Admin');
            },*/
            setUser: function (user) {
                //debugger;
                currentUser = user;
                deferred.resolve(user);
            },
            removeUser: function () {
                currentUser = {};
                deferred = $q.defer();
            }
        };
    };

    angular
        .module('issueTrackingSystemApp')
        .factory('identity', ['$q', identityService]);
}());