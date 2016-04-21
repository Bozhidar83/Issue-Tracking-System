(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('customPagination', [
            function() {
                return {
                    restrict: 'A',
                    replace: true,
                    templateUrl: 'partials/pagination/custom-pagination.html'
                }
            }
        ])
})();