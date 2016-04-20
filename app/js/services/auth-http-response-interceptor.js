(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('authHttpResponseInterceptor', [
            '$q',
            '$injector',
            'notifyService',
            //'$http',
            //'$location',
            //'authService',
            /*function($q, $location/!*, authService*!/) {
                return {
                    response: function(response){
                        if (response.status === 401) {
                            //debugger;
                            $location.path('/');
                        }

                        return response || $q.when(response);
                    },
                    responseError: function(rejection) {
                        if (rejection.status === 400) {
                            $location.path('/');

                        } else if (rejection.status === 401) {
                            //localStorage.removeItem('accessToken');
                            //localStorage.removeItem('username');
                            // TODO: Try to fix this
                            //authService.logout();
                            $location.path('/');
                        } else if(rejection.status === 404){
                            $location.path('/404/');
                        }

                        return $q.reject(rejection);
                    }
                }
            }*/
            function($q, $injector, notifyService) {
                return {
                    /*'request': function(config) {
                        var authService = $injector.get('authService');
                        if (authService.isAuthenticated()) {
                            config.headers['Authorization'] = 'Bearer ' + localStorage['accessToken'];
                        }

                        return config;
                    },*/

                    'requestError': function(rejection) {
                        //do something with the error
                        return $q.reject(rejection);
                    },

                    'response': function(response) {
                        // do something on success of request
                        return response;
                    },

                    'responseError': function(rejection) {
                        // do something on error like:
                        /*if(rejection.status == 401){
                             //userUnauthorized();
                            notifyService.showError('Please, log in first!');
                        }*/

                        return $q.reject(rejection);
                    }
                }
            }
        ]);
})();