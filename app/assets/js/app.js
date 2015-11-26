'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */


  (function () {
    'use strict';

    angular
      .module('webApp', [
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
          //for grunt serve this works
          templateUrl: './assets/views/home.html',
          //for node server.js this works but no css/js?
          //templateUrl: './views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/about', {
          templateUrl: './views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/faq', {
          templateUrl: '../views/faq.html',
          controller: 'FaqCtrl',
          controllerAs: 'faq'
        })
        .when('/login', {
          templateUrl: '../views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/register', {
          templateUrl: '../views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/booking', {
          templateUrl: '../views/booking.html',
          controller: 'BookingCtrl',
          controllerAs: 'booking'
        })
        .when('/fare', {
          templateUrl: '../views/fare.html',
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
        var restrictedPage = $.inArray($location.path(), ['/login', '/about', '/register', '/home', '/faq', '/booking', '/fare', '/contact']) === -1;
        var loggedIn = $rootScope.globals.currentUser;

       /* if(restrictedPage && !loggedIn) {
          $location.path('/login');
        }*/
      });

    }


  }) ();







/*
  // creating Angular Module
  var websiteApp = angular.module('websiteApp', []);
  
  // create angular controller and pass in $scope and $http
  websiteApp.controller('FormController',function($scope, $http,$timeout) {
	  
	  // creating a blank object to hold our form information.
	  //$scope will allow this to pass between controller and view
	  $scope.formData = {};
	   $scope.submitButtonDisabled = false;
	  // submission message doesn't show when page loads
	  $scope.submission = false;
	  // Updated code thanks to Yotam
	  var param = function(data) {
			var returnString = '';
			for (d in data){
				if (data.hasOwnProperty(d))
				   returnString += d + '=' + data[d] + '&';
			}
			// Remove last ampersand and return
			return returnString.slice( 0, returnString.length - 1 );
	  };
	  $scope.submitForm = function() {
	  	var status = true;
	  	 $("#contact input").each(function(){
	  	 	if(angular.element(this).hasClass("error")){
	  	 		status = false;
	  	 	}
	  	 })
	  	 
	  	if(status){
	  		
	  	
		$http({
		method : 'POST',
		url : 'process.php',
		data : param($scope.formData), // pass in data as strings
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
	  })
		.success(function(data) {
		  if (!data.success) {
		  	
		   // if not successful, bind errors to error variables
		   $scope.errorName = data.errors.name;
		   $scope.errorEmail = data.errors.email;
		   $scope.errorSubject = data.errors.subject;
		  // $scope.errorTextarea = data.errors.message;
		   $scope.submissionMessage = data.messageError;
		   $scope.submission = true; //shows the error message
		  } else {
		  // if successful, bind success message to message
		   $scope.successsubmissionMessage = data.messageSuccess;
		   $scope.formData = {}; // form fields are emptied with this line
		   $scope.submission = false; //shows the success message
		   $scope.submissionMessage = "";
		   $timeout(function(){$scope.successsubmissionMessage = ""},3000);
		  }
		 });
		}
	   };
});
*/