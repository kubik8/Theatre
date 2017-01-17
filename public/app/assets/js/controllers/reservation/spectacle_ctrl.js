var spectacle = angular.module('ta.sprectacle', [ 'ngResource']);

spectacle.controller('SpectacleCtrl', function($scope, $state, SpectacleSrv) {

	SpectacleSrv.getAll(function(response){
		$scope.spectacles = response;
	});	
	
	$scope.handleSpectacleSelected = function(spectacleId){
		$state.go('reservation.stage', { id: spectacleId });
	}
	
});