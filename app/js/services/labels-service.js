(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('labelsService', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function getLabels(params) {
                    var deferred = $q.defer();
                    console.log(params);
                    $http.get(BASE_URL + 'labels/?filter=' + params.filter)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return {
                    getLabels: getLabels
                }
            }
        ])
})();