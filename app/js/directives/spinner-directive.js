(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('spinnerDirective', [
            function() {
                return {
                    restrict: 'EA',
                    replace: true,
                    templateUrl: 'partials/spinner.html'
                }
            }
        ]);
})();