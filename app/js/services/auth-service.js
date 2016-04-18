(function () {
    'use strict';

    angular.module('issueTrackingSystemApp')
        .factory('authService', [
            '$http',
            '$q',
            '$cookies',
            'BASE_URL',
            'TOKEN_TYPE',
            'identity',
            function ($http, $q, $cookies, BASE_URL, TOKEN_TYPE, identity) {
                var TOKEN_KEY = 'authentication'; // cookie key

                function loginUser(userData) {
                    var deferred = $q.defer();

                    var data = "grant_type=password&username=" + (userData.username || '') + '&password=' + (userData.password || '');

                    $http.post(BASE_URL + 'api/Token', data, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            var tokenValue = response.data.access_token;
                            var expirationDate = new Date();
                            expirationDate.setHours(expirationDate.getHours() + 72);

                            $cookies.put(TOKEN_KEY, tokenValue, { expires: expirationDate });
                            //debugger;
                            $http.defaults.headers.common.Authorization = TOKEN_TYPE + tokenValue;

                            getIdentity()
                                .then(function () {
                                    //debugger;
                                    deferred.resolve(response);
                            });

                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function registerUser(userData) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/Register', userData)
                        .then(function(response) {
                            //sessionStorage['currentUser'] = JSON.stringify(response.config.data.email);
                            deferred.resolve(response.config.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function logout() {
                    //delete sessionStorage['currentUser'];
                    $cookies.remove(TOKEN_KEY);
                    $http.defaults.headers.common.Authorization = null;
                    identity.removeUser();
                }

                function getIdentity() {
                    var deferred = $q.defer();

                    if (isAuthenticated()) {
                        $http.get(BASE_URL + 'users/me')
                            .then(function(identityResponse) {
                                identity.setUser(identityResponse.data);
                                deferred.resolve(identityResponse.data);
                            });
                    }

                    return deferred.promise;
                }

                function isAuthenticated() {
                    return !!$cookies.get(TOKEN_KEY);
                }

                return {
                    login: loginUser,
                    register: registerUser,
                    logout: logout,
                    identity: getIdentity,
                    isAuthenticated: isAuthenticated,

                    // Old properties
                    getCurrentUser : function() {
                        return identity.getUser();
                        /*var userObject = sessionStorage['currentUser'];
                        if (userObject) {
                            return JSON.parse(userObject);
                        }*/
                    }
                }
            }]
        );
}());