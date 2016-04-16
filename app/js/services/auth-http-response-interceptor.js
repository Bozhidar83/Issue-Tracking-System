(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('authHttpResponseInterceptor', [
            '$q',
            '$location',
            //'authService',
            function($q, $location/*, authService*/) {
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
            }
        ]);
})();