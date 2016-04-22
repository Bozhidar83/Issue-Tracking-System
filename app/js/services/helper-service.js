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

                return {
                    numberOfPages: numberOfPages,
                    parseDate: parseDate,
                    generateProjectKey: generateProjectKey
                }
            }
        ])
})();