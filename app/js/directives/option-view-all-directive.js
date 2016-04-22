(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('optionViewAll', [
            function() {
                return {
                    restrict: 'A',
                    replace: true,
                    scope: {
                        option: '=?'
                    },
                    templateUrl: 'partials/options/option-view-all.html'
                }
            }
        ])
})();