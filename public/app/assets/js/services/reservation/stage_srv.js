stage.factory('StageSrv', function($resource) {
	var res = $resource(':source/:spectacleId', {}, {
		getTickets : {
			method : 'GET',
			params : {
				source : 'tickets'
			},
			isArray : true
		},
		getAllScenesForSpectacle : {
			method : 'GET',
			params : {
				source : 'ScenesForSpectacle'
			},
			isArray : true
		},
		getSpectaclePerformedsForScene : {
			url : 'spectacle/:spectacleId/scene/:sceneId/schedule',
			method : 'GET',
			isArray : true
		},
		getSeats : {
			method : 'GET',
			params : {
				source : 'numberFive'
			},
			isArray : true
		},
		reservation : {
			method : 'POST',
			params : {
				source : 'reservation'
			}
		}
	});

	return res;
});