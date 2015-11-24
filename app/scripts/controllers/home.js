(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name DrivenApp.controller:HomeCtrl
	 * @description
	 * # HomeCtrl
	 * Controller of the DrivenApp
	 */
	angular
		.module('DrivenApp')
		  .controller('HomeCtrl', function () {
		    this.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
	  });

}) ();