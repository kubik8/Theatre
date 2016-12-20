var stage = angular.module('ta.stage', [ 'ngResource']);

stage.controller('StageCtrl', function($scope, $stateParams) {
	console.log($stateParams.id);
	
	$scope.reservation = {};
	$scope.reservation.spectacle = "Dziady";
	
	$scope.reservation.selectedSeats = [];	
	$scope.phoneNumberRgx = '((00|\\+)(\\d{1,4}[ ]?))?(\\d{9})';	
	
	$scope.handleSeatSelected = function(seat){
		if(seat.status == "available"){
			$scope.reservation.selectedSeats.push(seat);
			seat.status = "selected";
			console.log("Dodano")
		}
		else if(seat.status == "selected"){
			var index = $scope.reservation.selectedSeats.indexOf(seat);
			console.log("USUWAMY " + index)
			if (index > -1) {
				$scope.reservation.selectedSeats.splice(index, 1);
			}
			seat.status = "available";
		}
	}
	
	$scope.handleBookBtnClick = function(){
		console.log($scope.reservation);
	}
	
	$scope.stages = ["Scena Świebodzka", "Scena kameralna", "Scena wielka"];	
	$scope.dates = ["2016-12-05 12:00", "2017-01-06 18:00", "2017-01-23 20:30"];
	
	$scope.seats = [
		[
			{row: 1, number: 1, status: "available"},
			{row: 1, number: 2, status: "available"},
			{row: 1, number: 3, status: "available"},
			{row: 1, number: 4, status: "available"},
			{row: 1, number: 5, status: "available"},
			{row: 1, number: 6, status: "available"},
			{row: 1, number: 7, status: "available"},
			{row: 1, number: 8, status: "available"},
			{row: 1, number: 9, status: "available"},
			{row: 1, number: 10, status: "available"},
			{row: 1, number: 11, status: "available"},
			{row: 1, number: 12, status: "blocked"},
			{row: 1, number: 13, status: "available"},
			{row: 1, number: 14, status: "available"},
			{row: 1, number: 15, status: "available"},
			{row: 1, number: 16, status: "available"},
			{row: 1, number: 17, status: "available"},
			{row: 1, number: 18, status: "available"},
			{row: 1, number: 19, status: "available"},
			{row: 1, number: 20, status: "available"}
		],
		[
			{row: 2, number: 21, status: "available"},
			{row: 2, number: 22, status: "available"},
			{row: 2, number: 23, status: "available"},
			{row: 2, number: 24, status: "available"},
			{row: 2, number: 25, status: "available"},
			{row: 2, number: 26, status: "blocked"},
			{row: 2, number: 27, status: "blocked"},
			{row: 2, number: 28, status: "blocked"},
			{row: 2, number: 29, status: "available"},
			{row: 2, number: 30, status: "available"},
			{row: 2, number: 31, status: "available"},
			{row: 2, number: 32, status: "available"},
			{row: 2, number: 33, status: "available"},
			{row: 2, number: 34, status: "available"},
			{row: 2, number: 35, status: "available"},
			{row: 2, number: 36, status: "available"},
			{row: 2, number: 37, status: "available"},
			{row: 2, number: 38, status: "available"},
			{row: 2, number: 39, status: "available"},
			{row: 2, number: 40, status: "available"}
		],
		[
			{row: 3, number: 101, status: "available"},
			{row: 3, number: 102, status: "available"},
			{row: 3, number: 103, status: "available"},
			{row: 3, number: 104, status: "available"},
			{row: 3, number: 105, status: "available"},
			{row: 3, number: 106, status: "available"},
			{row: 3, number: 107, status: "available"},
			{row: 3, number: 108, status: "available"},
			{row: 3, number: 109, status: "available"},
			{row: 3, number: 110, status: "available"},
			{row: 3, number: 111, status: "available"},
			{row: 3, number: 112, status: "available"},
			{row: 3, number: 113, status: "available"},
			{row: 3, number: 114, status: "available"},
			{row: 3, number: 115, status: "available"},
			{row: 3, number: 116, status: "available"},
			{row: 3, number: 117, status: "available"},
			{row: 3, number: 118, status: "available"},
			{row: 3, number: 119, status: "available"},
			{row: 3, number: 120, status: "available"}
		],
		[
			{row: 4, number: 1, status: "available"},
			{row: 4, number: 2, status: "available"},
			{row: 4, number: 3, status: "available"},
			{row: 4, number: 4, status: "available"},
			{row: 4, number: 5, status: "available"},
			{row: 4, number: 6, status: "available"},
			{row: 4, number: 7, status: "available"},
			{row: 4, number: 8, status: "available"},
			{row: 4, number: 9, status: "blocked"},
			{row: 4, number: 10, status: "available"},
			{row: 4, number: 11, status: "available"},
			{row: 4, number: 12, status: "available"},
			{row: 4, number: 13, status: "available"},
			{row: 4, number: 14, status: "available"},
			{row: 4, number: 15, status: "blocked"},
			{row: 4, number: 16, status: "blocked"},
			{row: 4, number: 17, status: "available"},
			{row: 4, number: 18, status: "available"},
			{row: 4, number: 19, status: "available"},
			{row: 4, number: 20, status: "available"}
		],
		[
			{row: 5, number: 1, status: "available"},
			{row: 5, number: 2, status: "available"},
			{row: 5, number: 3, status: "available"},
			{row: 5, number: 4, status: "available"},
			{row: 5, number: 5, status: "available"},
			{row: 5, number: 6, status: "available"},
			{row: 5, number: 7, status: "available"},
			{row: 5, number: 8, status: "available"},
			{row: 5, number: 9, status: "available"},
			{row: 5, number: 10, status: "available"},
			{row: 5, number: 11, status: "available"},
			{row: 5, number: 12, status: "available"},
			{row: 5, number: 13, status: "available"},
			{row: 5, number: 14, status: "available"},
			{row: 5, number: 15, status: "available"},
			{row: 5, number: 16, status: "available"},
			{row: 5, number: 17, status: "available"},
			{row: 5, number: 18, status: "available"},
			{row: 5, number: 19, status: "available"},
			{row: 5, number: 20, status: "available"}
		],
		[
			{row: 6, number: 1, status: "available"},
			{row: 6, number: 2, status: "available"},
			{row: 6, number: 3, status: "available"},
			{row: 6, number: 4, status: "available"},
			{row: 6, number: 5, status: "available"},
			{row: 6, number: 6, status: "available"},
			{row: 6, number: 7, status: "available"},
			{row: 6, number: 8, status: "available"},
			{row: 6, number: 9, status: "available"},
			{row: 6, number: 10, status: "available"},
			{row: 6, number: 11, status: "available"},
			{row: 6, number: 12, status: "available"},
			{row: 6, number: 13, status: "available"},
			{row: 6, number: 14, status: "available"},
			{row: 6, number: 15, status: "available"},
			{row: 6, number: 16, status: "available"},
			{row: 6, number: 17, status: "available"},
			{row: 6, number: 18, status: "available"},
			{row: 6, number: 19, status: "available"},
			{row: 6, number: 20, status: "available"}
		]
	];
	
	$scope.tickets = [
		{name: "Normalny", price: 40.28},
		{name: "Ulgowy", price: 30.59}
	];
	

	
});