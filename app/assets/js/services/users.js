//this is the users service for handling the registration and login from the webapp and to POST to the driverr-app server

(function() {
	'use strict';

	angular
		.module('webApp')
		.factory('UserService', UserService);

	UserService.$inject = ['$http'];

	function UserService($http) {
		var service = { };

		service.getUser = getUser;
		service.create = create;
		service.update = update;
		service.delete = delete;

		return service;

		function getUser(id) {
			return $http.get('driverr-app.herokuapp.com/api/accountinfo' + id).then(success, error('Error retrieving the account information'));
		}

		function create(user) {
			return $http.post('driverr-app.herokuapp.com/api/register' + user).then(success, error('Error creating user'));
		}

		// function update(user) {
		// 	return $http.put('driverr-app.herokuapp.com/api/update' + user).then(success, error('Error updating account information'));
		// }

		// function delete(user) {
		// 	return $http.delete('driverr-app.herokuapp.com/api/deleteuser' + user).then(success, error('Error deleting account information'));
		// }

		function success(res) {
			return("Success! " + res.data);
		}

		function error (err) {
			return function() {
				return { success: false, message: err};
			};
		}
	}

})();