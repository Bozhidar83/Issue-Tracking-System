(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('affiliatedProjects', [
            function() {
                return {
                    restrict: 'A',
                    replace: true,
                    scope: {
                        userProjects: '=userProjects'
                    },
                    templateUrl: 'partials/affiliated-projects.html'
                }
            }
        ])
})();