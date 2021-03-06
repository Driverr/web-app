(function () {
	
	'use strict';

	angular
		.module('webApp')
		.controller('LoginCtrl', LoginCtrl)

	LoginCtrl.$inject = ['$location', 'AuthenticationService', 'FlashService'];
	
	function LoginCtrl($location, AuthenticationService, FlashService) {
		var vm = this;

		vm.login = login;

		( function initController() {
			//reset login status
			AuthenticationService.ClearCredentials();
		}) ();

		function login() {
			vm.dataLoading = true;

			AuthenticationService.Login(vm.number, vm.password, function(response) {
				if(response.success) {
					AuthenticationService.SetCredentials(vm.number, vm.password);
					$location.path('/');
				}
				else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		};
	}	


}) ();

