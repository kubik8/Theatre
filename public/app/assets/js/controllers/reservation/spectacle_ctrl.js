var spectacle = angular.module('ta.sprectacle', [ 'ngResource']);

spectacle.controller('SpectacleCtrl', function($scope, $state, SpectacleSrv) {

	SpectacleSrv.getAll(function(response){
		$scope.spectacles = response;
	});
	
	// $scope.spectacles = [
	// 	{
	// 		id: 1, 
	// 		title: "Burza",
	// 		description: "Burza to sieć pajęcza, jej centrum to dzika wyspa, środowisko obce, " +
	// 				"dalekie od cywilizowanego świata, na które Prospero desperacko próbuje nanieść znaczenia. " +
	// 				"To usiane kępkami trawy pustkowie zaostrza ludzkie pragnienia i namiętności. Miłość jest tu potężniejsza, " +
	// 				"władza absolutna, a żądza jest ścieżką prowadzącą do śmierci. Shakespeare swój utwór, ponoć ostatni, " +
	// 				"prowadzi bajkowo, zmierzając do pojednania. Czym jednak ono może być, gdy sprawcza moc magiczna przestaje " +
	// 				"działać?"
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Dziady",
	// 		description: "Epokowe wydarzenie: pierwszy raz w całości na scenie najważniejsze dzieło w historii polskiego teatru" +
	// 				" – Dziady Adama Mickiewicza."
	// 	}
	// ]
	
	$scope.handleSpectacleSelected = function(spectacleId){
		$state.go('reservation.stage', { id: spectacleId });
	}
	
});