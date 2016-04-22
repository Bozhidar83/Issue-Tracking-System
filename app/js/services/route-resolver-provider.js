(function() {
    "use strict";

    // TODO: Fix route resolver
    angular.module('issueTrackingSystemApp')
        .provider('routeResolvers', [
            function routeResolversProvider() {
                var routeResolvers = {
                    authenticated: ['$q', 'authService', function ($q, authService) {
                        if (!authService.isAuthenticated()) {
                            return $q.reject('not authorized');
                        }

                        return $q.when(true);
                    }],
                };

                var routeResolveChecks = {
                    home: {
                        authenticated: routeResolvers.authenticated
                    },
                    projects: {

                    },
                    issues: {

                    },
                    profile: {

                    }
                };

                return {
                    $get: function () {
                        return routeResolveChecks;
                    }
                };
            }
        ]);
})();