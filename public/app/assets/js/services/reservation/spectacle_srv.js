spectacle.factory('SpectacleSrv', function($resource) {
	var res = $resource('spectacles/:id', {}, {
		getAll : {
			method : 'GET',
			isArray : true
		},
		get : {
			method : 'GET'
		}
	});

	return res;
});