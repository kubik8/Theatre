app.directive('formValidation', function() {
	function findFormGroup(el) {
		if (el.hasClass('form-group')) {
			return el;
		} else if (el.parent()) {
			return findFormGroup(el.parent());
		}
		return null;
	}
	
	return {
		restrict : 'A',
		require: 'ngModel',
		link : function(scope, el, attrs, elCtrl) {			
			var parentEl = findFormGroup(el.parent());			
			
			if (parentEl != null) {
				scope.$watch(function() {
					return {valid: elCtrl.$valid, pristine: elCtrl.$pristine, formSubmitted: elCtrl.$$parentForm.$submitted};
				}, function() {
					parentEl.toggleClass('has-error', elCtrl.$invalid && (!elCtrl.$pristine || elCtrl.$$parentForm.$submitted));
					parentEl.toggleClass('has-success', elCtrl.$valid && (!elCtrl.$pristine || elCtrl.$$parentForm.$submitted));
				}, true);
			}
		}
	};
});
 