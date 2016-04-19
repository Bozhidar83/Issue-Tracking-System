(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('commentDirective', [
            function() {
                return {
                    restrict: 'A',
                    templateUrl: 'partials/comment.html'
                }
            }
        ])
})();