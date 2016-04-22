(function() {
    "use strict";

    function config($routeProvider, $httpProvider/*, routeResolversProvider*/) {
        //var routeResolveChecks = routeResolversProvider.$get();
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                access: {
                    requiresAuthentication: false
                }
                //resolve: routeResolveChecks.home
            })
            .when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'RegisterController',
                access: {
                    requiresAuthentication: false
                }
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController',
                access: {
                    requiresAuthentication: false
                }
            })
            .when('/logout', {
                controller: 'AppController',
                redirectTo: '/',
                access: {
                    requiresAuthentication: false
                }
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'UserController',
                access: {
                    requiresAuthentication: true
                }
            })
            .when('/profile/password', {
                templateUrl: 'partials/edit-password.html',
                controller: 'UserController',
                access: {
                    requiresAuthentication: true
                }
            })
            .when('/projects', {
                templateUrl: 'partials/all-projects.html',
                controller: 'ProjectController',
                access: {
                    requiresAuthentication: true,
                    requiresAdmin: true
                }
            })
            .when('/projects/add', {
                templateUrl: 'partials/add-project.html',
                controller: 'ProjectController',
                access: {
                    requiresAuthentication: true,
                    requiresAdmin: true
                }
            })
            .when('/projects/:id/edit', {
                templateUrl: 'partials/edit-project.html',
                controller: 'ProjectController',
                access: {
                    requiresAuthentication: true,
                    requiresAdminOrLead: true
                }
            })
            .when('/projects/:id', {
                templateUrl: 'partials/project-page.html',
                controller: 'ProjectController',
                access: {
                    requiresAuthentication: true
                }
            })
            .when('/projects/:id/add-issue', {
                templateUrl: 'partials/add-issue.html',
                controller: 'IssueController',
                access: {
                    requiresAuthentication: true,
                    requiresAdminOrLead: true
                }
            })
            .when('/issues/:id', {
                templateUrl: 'partials/issue-page.html',
                controller: 'IssueController',
                access: {
                    requiresAuthentication: true
                }
            })
            .when('/issues/:id/edit', {
                templateUrl: 'partials/edit-issue.html',
                controller: 'IssueController',
                access: {
                    requiresAuthentication: true,
                    requiresAdminOrLead: true
                }
            })

            .otherwise({redirectTo: '/'});

        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }

    function run($rootScope, $location, $http, $cookies, authService, notifyService, TOKEN_TYPE, TOKEN_KEY) {
        // TODO: Redirect when user trying to reach unavailable resource
        /*$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                notifier.warning('Please log into your account first!');
                $location.path('/');
            }
        });*/

        $rootScope.$on('$routeChangeStart', function(event, next) {
            if (next.access && next.access.requiresAuthentication && !authService.isAuthenticated()) {
                debugger;
                $location.path('/');
            } else if (next.access && next.access.requiresAdmin && !authService.isAdmin()) {
                $location.path('/');
                notifyService.showError('You are not allowed to perform action!');
            }
        });

        if (authService.isAuthenticated()) {
            // For keep user info while visiting different pages of the app
            $http.defaults.headers.common.Authorization = TOKEN_TYPE + $cookies.get(TOKEN_KEY);
            authService.identity()
                .then(function (userData) {
                    // Can display 'Welcome back' message
            });
        }
    }

    angular.module('issueTrackingSystemApp', ['ngRoute', 'ngCookies', 'ui.bootstrap.pagination', 'angularSpinner']);

    angular.module('issueTrackingSystemApp')
        .config(['$routeProvider', '$httpProvider',/*'routeResolversProvider',*/ config]);

    angular.module('issueTrackingSystemApp')
        .run(['$rootScope', '$location', '$http', '$cookies', 'authService', 'notifyService', 'TOKEN_TYPE', 'TOKEN_KEY', run]);

    angular.module('issueTrackingSystemApp')
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
        .constant('TOKEN_TYPE', 'Bearer ')
        .constant('TOKEN_KEY', 'authentication')
        .constant('PAGE_SIZE', 5)
        .constant('CURRENT_PAGE', 0)
        .constant('_', window._);
})();
