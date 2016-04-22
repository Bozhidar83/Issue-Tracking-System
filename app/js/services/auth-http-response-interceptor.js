(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('authHttpResponseInterceptor', [
            '$q',
            '$injector',
            'notifyService',
            function($q, $injector, notifyService) {
                return {
                    /*'request': function() {

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