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

                function updateIssue(issue, id) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + '/' + id, issue, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            deferred.resolve(response);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                // TODO: Get all issues related to user
                function getUserRelatedIssues(params) {
                    //debugger;
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return {
                    createIssue: createIssue,
                    getIssueById: getIssueById,
                    updateIssue: updateIssue,
                    getUserRelatedIssues: getUserRelatedIssues
                }
            }
        ])
})();