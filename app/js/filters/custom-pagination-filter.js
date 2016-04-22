(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .filter('pagination', [
            function() {
                return function(input, start) {
                    //debugger;
                    start = +start;

                    return input.slice(start);
                }
            }
        ])
})();