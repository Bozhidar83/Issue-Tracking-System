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
                    $http.get(BASE_URL + 'issues/' + id)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function updateIssue(issue, id) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'issues/' + id, issue, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            deferred.resolve(response);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getUserRelatedIssues(params) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage)
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getAllIssues(filter) {
                    var MAX_ISSUES = 100000;
                    var deferred = $q.defer();

                    var queryString = '?filter=';
                    queryString += filter.status ? 'Status.Name == "' + filter.status + '"' : '';
                    if (filter.status) {
                        queryString += filter.day ? 'and DueDate.Day == ' + filter.day : '';
                    } else {
                        queryString += filter.day ? 'DueDate.Day == ' + filter.day : '';
                    }
                    if (filter.status || filter.day) {
                        queryString += filter.month ? 'and DueDate.Month == ' + filter.month : '';
                    } else {
                        queryString += filter.month ? 'DueDate.Month == ' + filter.month : '';
                    }
                    if (filter.status || filter.day || filter.month) {
                        queryString += filter.year ? 'and DueDate.Year == ' + filter.year : '';
                    } else {
                        queryString += filter.year ? 'DueDate.Year == ' + filter.year : '';
                    }

                    $http.get(BASE_URL + 'issues/' + queryString + '&pageSize=' + MAX_ISSUES + '&pageNumber=1')
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function changeStatus(issueId, statusId) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusId=' + statusId, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function addComment(comment, issueId) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'issues/' + issueId + '/comments', comment, {headers:{'ContentType':'application/x-www-form-urlencoded'}})
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getComments(issueId) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'issues/' + issueId + '/comments')
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
                    getUserRelatedIssues: getUserRelatedIssues,
                    getAllIssues: getAllIssues,
                    changeStatus: changeStatus,
                    addComment: addComment,
                    getComments: getComments
                }
            }
        ])
})();