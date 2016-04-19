(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('paginationDirective', [
            function() {
                return {
                    restrict: 'A',
                    replace: true,
                    scope: {
                        
                    },
                    templateUrl: 'partials/pagination/pagination.html'
                    //controller: 'AppController'
                }
            }
        ])
})();