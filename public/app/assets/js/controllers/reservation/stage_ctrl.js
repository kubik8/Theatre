var stage = angular.module('ta.stage', [ 'ngResource']);

stage.controller('StageCtrl', function($scope, $stateParams, SpectacleSrv, StageSrv, CustomerSrv) {
	
	$scope.reservation = {};
	$scope.reservationStatus = "in progress";
	$scope.reservation.selectedSeats = [];
	$scope.reservation.totalPrice = 0;
	$scope.showStage = false;		
	
	$scope.phoneNumberRgx = '((00|\\+)(\\d{1,4}[ ]?))?(\\d{9})';


	SpectacleSrv.get({id: $stateParams.id}, function(response){
		$scope.spectacle = response.title;
	});

	StageSrv.getTickets({spectacleId: $stateParams.id}, function(response){
		$scope.tickets = response;
	});

	StageSrv.getAllScenesForSpectacle({spectacleId: $stateParams.id}, function(response){
		$scope.stages = response;
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
		StageSrv.reservation(null, $scope.reservation, function(){
			$scope.reservationStatus = "success";
		}, function(){
			$scope.reservationStatus = "fail";
		});
	}

	$scope.generateStage = function(){
		$scope.showStage = true;
		$scope.reservation.selectedSeats = [];
		$scope.reservation.totalPrice = 0;
		
		StageSrv.getSeats({spectacleId: $scope.reservation.spectaclePerformed.id}, function(response){
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
	}

	$scope.getClientData = function(){
		CustomerSrv.getByEmail({email: $scope.reservation.client.email}, function(response){
			$scope.reservation.client = response;
		});
	}

	$scope.getSpectaclePerformedsForScene = function(selectedSceneId){
		$scope.showStage = false;
		$scope.reservation.selectedSeats = [];
		$scope.reservation.totalPrice = 0;

		StageSrv.getSpectaclePerformedsForScene({spectacleId: $stateParams.id, sceneId: selectedSceneId}, function(response){
				$scope.spectaclePerformeds = response;
		});	
	}

	$scope.calculateTotalPrice = function(){
		$scope.reservation.totalPrice = 0;

		for(var i=0; i < $scope.reservation.selectedSeats.length; i++){
			if($scope.reservation.selectedSeats[i].ticket != null){
				$scope.reservation.totalPrice += parseFloat($scope.reservation.selectedSeats[i].ticket.price);
			}
		}
	}

	$scope.createSeatsArrays = function(maxRow){
		$scope.seats = [];

		for(var i=0; i < maxRow; i++){
			$scope.seats[i] = [];
		}
	}
	
	// $scope.stages = [
	// 	{id: 1, name:"Scena Świebodzka"}, 
	// 	{id: 2, name:"Scena kameralna"},
	// 	{id: 3, name:"Scena wielka"}
	// ];

	// $scope.spectaclePerformeds = [
	// 	{id: 1, spectacles_id: 1, stages_id: 1, date: "2017-01-12T20:00:00.000Z", name: "Scena Świebodzka"}, 
	// 	{id: 2, spectacles_id: 1, stages_id: 1, date: "2017-01-13T21:00:00.000Z", name: "Scena Świebodzka"}, 
	// 	{id: 3, spectacles_id: 1, stages_id: 1, date: "2017-03-12T09:00:00.000Z", name: "Scena Świebodzka"}
	// ];
	
	// $scope.tickets = [
	// 	{name: "Normalny", price: 40.28},
	// 	{name: "Ulgowy", price: 30.59}
	// ];
	
});