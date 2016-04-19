(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('addCommentDirective', [
            function() {
                return {
                    restrict: 'AE',
                    templateUrl: 'partials/add-comment.html'
                }
            }
        ])
})();