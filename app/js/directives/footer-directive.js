(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('footerDirective', [
            function() {
                return {
                    restrict: 'A',
                    replace: true,
                    templateUrl: 'partials/footer.html',
                    controller: 'AppController'
                }
            }
        ])
})();