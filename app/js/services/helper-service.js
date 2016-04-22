(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('helperService', [
            function() {
                function numberOfPages(totalItems, pageSize) {
                    return Math.ceil(totalItems / pageSize);
                }

                function parseDate(dateAsString) {
                    return new Date(dateAsString);
                }

                function generateProjectKey(projectName) {
                    var projectKey = '';
                    var separateNameParts = projectName.split(' ');
                    separateNameParts.forEach(function(item) {
                        projectKey += item.slice(0,1).toUpperCase();
                    });

                    return projectKey;
                }

                function objectToArray(obj) {
                    return Object.properties(obj).map(function (key) {
                            return obj[key];
                        });
                }

                return {
                    numberOfPages: numberOfPages,
                    parseDate: parseDate,
                    generateProjectKey: generateProjectKey,
                    objectToArray: objectToArray
                }
            }
        ])
})();