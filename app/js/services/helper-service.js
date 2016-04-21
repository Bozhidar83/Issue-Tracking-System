(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .factory('helperService', [
            function() {
                function numberOfPages(totalItems, pageSize) {
                    return Math.ceil(totalItems / pageSize);
                }

                return {
                    numberOfPages: numberOfPages
                }
            }
        ])
})();