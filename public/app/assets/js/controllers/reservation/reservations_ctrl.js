var reservation = angular.module('ta.reservation', [ 'ngResource']);

spectacle.controller('ReservationCtrl', function($scope, $state, ReservationSrv) {

	// SpectacleSrv.getAll(function(response){
	// 	$scope.reservations = response;
	// });

	$scope.selectReservation = function(reservation){
		$scope.selectedReservation = reservation;
	};

	$scope.reservations = [
		{
			"id" : 1,
			"title" : "Dziady",
			"selectedSeats":[
				{"row":2,"number":31,"status":"selected","ticket":
					{"id":1,"spectacles_id":1,"ticket_price_groups_id":1,"price":"42.99","name":"Normalny"}},
				{"row":3,"number":51,"status":"selected","ticket":
					{"id":2,"spectacles_id":1,"ticket_price_groups_id":2,"price":"25.21","name":"Ulgowy"}}],
			"totalPrice":"42.99",
			"client":
				{"name":"Jan","surname":"Nowak","email":"test@test.pl","phone":"123456789"},
			"spectaclePerformed":
				{"id":1,"spectacles_id":1,"stages_id":3,"date":"2017-01-02T17:00:00.000Z","name":"Scena Główna"}
		},
		{
			"id" : 2,
			"title" : "Burza",
			"selectedSeats":[
				{"row":2,"number":31,"status":"selected","ticket":
					{"id":1,"spectacles_id":1,"ticket_price_groups_id":1,"price":"42.99","name":"Normalny"}},
				{"row":3,"number":51,"status":"selected","ticket":
					{"id":2,"spectacles_id":1,"ticket_price_groups_id":2,"price":"25.21","name":"Ulgowy"}}],
			"totalPrice":"42.99",
			"client":
				{"name":"Magda","surname":"Kowalska","email":"test@test.pl","phone":"123456789"},
			"spectaclePerformed":
				{"id":1,"spectacles_id":1,"stages_id":3,"date":"2017-01-02T17:00:00.000Z","name":"Scena Główna"}
		}
	];
	
});