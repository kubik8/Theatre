var reservation = angular.module('ta.reservation', [ 'ngResource']);

spectacle.controller('ReservationCtrl', function($scope, $state, ReservationSrv) {

	SpectacleSrv.getAll(function(response){
		$scope.reservations = response;
	});
	
});