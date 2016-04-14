(function() {
    "use strict";

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            })
            .when('/register', {
                templateUrl: 'partials/register.html',
                controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            })
            .when('/profile', {
                templateUrl: 'partials/profile.html',
                controller: 'UserController'
            })
            .when('/profile/password', {
                templateUrl: 'partials/edit-password.html',
                controller: 'UserController'
            })
            .when('/projects', {
                templateUrl: 'partials/all-projects.html',
                controller: 'ProjectController'
            })
            .when('/projects/add', {
                templateUrl: 'partials/add-project.html',
                controller: 'ProjectController'
            })
            .when('/projects/:id/edit', {
                templateUrl: 'partials/edit-project.html',
                controller: 'ProjectController'
            })
            .when('/projects/:id', {
                templateUrl: 'partials/project-page.html',
                controller: 'ProjectController'
            })
            .otherwise({redirectTo: '/'});
    }

    function run($rootScope, $location, $http, $cookies, authService, notifyService, TOKEN_TYPE) {
        // TODO: Redirect when user trying to reach unavailable resource
        /*$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                notifier.warning('Please log into your account first!');
                $location.path('/');
                angular
                    .element('#open-login-btn')
                    .trigger('click');

                angular.element('#login-modal')
                    .attr('data-previous-route', previous.$$route.originalPath)
                    .attr('data-current-route', current.$$route.originalPath);
            }
        });*/

        if (authService.isAuthenticated()) {
            // For keep user info while visiting different pages of the app
            $http.defaults.headers.common.Authorization = TOKEN_TYPE + $cookies.get('authentication');
            authService.identity()
                .then(function (userData) {
                    // Can display 'Welcome back' message
                    //notifyService.showInfo('Welcome back, ' + userData.Username + '!');
            });
        }
    }

    angular.module('issueTrackingSystemApp', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
        .config(['$routeProvider', config]);

    angular.module('issueTrackingSystemApp')
        .run(['$rootScope', '$location', '$http', '$cookies', 'authService', 'notifyService', 'TOKEN_TYPE', run]);

    angular.module('issueTrackingSystemApp')
        .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
        .constant('TOKEN_TYPE', 'Bearer ');
})();
