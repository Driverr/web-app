var webApp = angular.module('HomeCtrl', []);

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name webApp.controller:HomeCtrl
	 * @description
	 * # HomeCtrl
	 * Controller of the webApp
	 */
	angular
		.module('webApp')
		  .controller('HomeCtrl', function () {
		    this.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
	  });

}) ();