( function () {

	'use strict';

	angular
		.module('webApp')
		.factory('UserService', UserService);

	UserService.$inject = ['$http'];

	function UserService($http) {
		var service = {};

		service.GetAll = GetAll;
		service.GetById = GetById;
		service.GetByUsername = GetByUsername;
		service.Create = Create;
		service.Update = Update;
		service.Delete = Delete;

		return service;
	
		function GetAll() {
			return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
		}

		function GetById() {
			return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by Id'));
		}


		function GetByUsername() {
			return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by Id'));
		}

		function Create(user) {
			return $http.post('driverr-app.herokuapp.com/api/register', user).then(handleSuccess, handleError('Error creating user'));
		}

		function Update(user) {
			return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
		}

		function Delete(id) {
			return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
		}


		//private functions

		function handleSuccess(res) {
			return res.data;
		}

		function handleError(error) {
			return function () {
				return { success: false, message: error };
			};
		}


	}


}) ();