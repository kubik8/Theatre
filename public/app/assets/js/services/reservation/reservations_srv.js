spectacle.factory('ReservationSrv', function($resource) {
	var res = $resource('reservation/', {}, {
		getAll : {
			method : 'GET',
			isArray : true
		}
	});

	return res;
});