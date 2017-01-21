stage.factory('CustomerSrv', function($resource) {
	var res = $resource('customer/:id', {}, {
		getByEmail : {
			method : 'GET'
		}		
	});

	return res;
});