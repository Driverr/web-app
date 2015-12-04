//this is the bookings service to handle the booking info from the webapp form and POST to driverr-app server


( function() { 
	'use strict';

	angular
		.module('webApp')
		.factory('BookingService', BookingService);

	BookingService.$inject = ['$http'];

	function BookingService($http) {
		var service = {};

		service.makeBooking = makeBooking;

		return service;

		function makeBooking(book) {
			return $http.post('driverr-app.herokuapp.com/api/booking' + book).then(success, error('Error making the booking.'));
		}

		function success(res) {
			return("Success: " +  res.data);
		}

		function error(err) {
			return function() {
				return {success: false, message: err};
			};
		}
	}

}) ();