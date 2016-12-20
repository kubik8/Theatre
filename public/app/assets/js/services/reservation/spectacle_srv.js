spectacle.factory('SpectacleSrv', function($resource) {
	var res = $resource('spectacle/:operation', {}, {
//		getAllLimits : {
//			method : 'GET',
//			params : {
//				operation : 'getAllLimits'
//			},
//			isArray : true
//		},
//		add : {
//			method : 'POST'
//		},
//		update : {
//			method : 'PUT'
//		},
//		remove : {
//			method : 'DELETE'
//		}
	});

	return res;
});