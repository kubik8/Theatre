var stage = angular.module('ta.stage', [ 'ngResource']);

stage.controller('StageCtrl', function($scope, $stateParams, SpectacleSrv, StageSrv) {
	
	$scope.totalPrice = 0;	
	$scope.reservation = {};
	
	$scope.reservation.selectedSeats = [];	
	$scope.phoneNumberRgx = '((00|\\+)(\\d{1,4}[ ]?))?(\\d{9})';


	SpectacleSrv.get({id: $stateParams.id}, function(response){
		$scope.spectacle = response.title;
	});

	// StageSrv.getTickets({spectacleId: $stateParams.id}, function(response){
	// 	console.log(response);
	// });

	// StageSrv.getSpectaclePerformeds({spectacleId: $stateParams.id}, function(response){
	// 	console.log(response);
	// });

	StageSrv.getSeats({spectacleId: $stateParams.id}, function(response){
		$scope.createSeatsArrays(response[response.length-1].row);

		for (var i=0; i < response.length; i++){
			if(response[i].status == true){
				response[i].status = "blocked";
			}
			else {
				response[i].status = "available";
			}
			$scope.seats[response[i].row - 1].push(response[i]);
		}
	});

	
	
	$scope.handleSeatSelected = function(seat){
		if(seat.status == "available"){
			$scope.reservation.selectedSeats.push(seat);
			seat.status = "selected";
		}
		else if(seat.status == "selected"){
			var index = $scope.reservation.selectedSeats.indexOf(seat);
			if (index > -1) {
				$scope.reservation.selectedSeats.splice(index, 1);
			}
			seat.status = "available";
		}
	}
	
	$scope.handleBookBtnClick = function(){
		console.log($scope.reservation);
	}

	$scope.calculateTotalPrice = function(){
		$scope.totalPrice = 0;

		for(var i=0; i < $scope.reservation.selectedSeats.length; i++){
			if($scope.reservation.selectedSeats[i].ticket != null){
				$scope.totalPrice += $scope.reservation.selectedSeats[i].ticket.price;
			}
		}
	}

	$scope.createSeatsArrays = function(maxRow){
		$scope.seats = [];

		for(var i=0; i < maxRow; i++){
			$scope.seats[i] = [];
		}
	}
	
	$scope.stages = ["Scena Świebodzka", "Scena kameralna", "Scena wielka"];	
	$scope.dates = ["2016-12-05 12:00", "2017-01-06 18:00", "2017-01-23 20:30"];
	
	$scope.tickets = [
		{name: "Normalny", price: 40.28},
		{name: "Ulgowy", price: 30.59}
	];
	
});