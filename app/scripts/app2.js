'use strict';

/**
 * @ngdoc overview
 * @name DrivenApp
 * @description
 * # DrivenApp
 *
 * Main module of the application.
 */


  (function () {
    'use strict';

    angular
      .module('DrivenApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
      ])
      .config(config)
      .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/faq', {
          templateUrl: 'views/faq.html',
          controller: 'FaqCtrl',
          controllerAs: 'faq'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/booking', {
          templateUrl: 'views/booking.html',
          controller: 'BookingCtrl',
          controllerAs: 'booking'
        })
        .when('/fare', {
          templateUrl: 'views/fare.html',
          controller: 'FareCtrl',
          controllerAs: 'fare'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

    function run($rootScope, $location, $cookieStore, $http) {
      //keep user logged in after page refresh

      $rootScope.globals = $cookieStore.get('globals') || {};
      if($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/faq', '/booking', '/fare', '/contact']) === -1;
        var loggedIn = $rootScope.globals.currentUser;

       /* if(restrictedPage && !loggedIn) {
          $location.path('/login');
        }*/
      });

    }


  }) ();
