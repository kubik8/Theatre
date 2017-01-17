stage.factory('StageSrv', function($resource) {
	var res = $resource(':source/:spectacleId', {}, {
		getTickets : {
			method : 'GET',
			params : {
				source : 'TicketsPriceGroup'
			},
			isArray : true
		},
		getSpectaclePerformeds : {
			method : 'GET',
			params : {
				source : 'SpectaclePerformeds'
			},
			isArray : true
		},
		getSeats : {
			method : 'GET',
			params : {
				source : 'numberFive'
			},
			isArray : true
		}
	});

	return res;
});