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

                return {
                    numberOfPages: numberOfPages,
                    parseDate: parseDate
                }
            }
        ])
})();