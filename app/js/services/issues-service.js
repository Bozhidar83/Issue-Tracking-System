(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('issuesService', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {
                function createIssue(issue) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'issues', issue, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(responce) {
                            deferred.resolve(responce.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getIssueById(id) {
                    var deferred = $q.defer();
                    //debugger;
                    $http.get(BASE_URL + 'issues/' + id)
                        .then(function(response) {
                            //debugger;
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });
                    return deferred.promise;
                }

                return {
                    createIssue: createIssue,
                    getIssueById: getIssueById
                }
            }
        ])
})();