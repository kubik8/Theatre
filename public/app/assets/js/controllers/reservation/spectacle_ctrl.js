var spectacle = angular.module('ta.sprectacle', [ 'ngResource']);

spectacle.controller('SpectacleCtrl', function($scope, $state) {
	
	$scope.spectacles = [
		{
			id: 1, 
			title: "Burza",
			description: "Burza to sieć pajęcza, jej centrum to dzika wyspa, środowisko obce, " +
					"dalekie od cywilizowanego świata, na które Prospero desperacko próbuje nanieść znaczenia. " +
					"To usiane kępkami trawy pustkowie zaostrza ludzkie pragnienia i namiętności. Miłość jest tu potężniejsza, " +
					"władza absolutna, a żądza jest ścieżką prowadzącą do śmierci. Shakespeare swój utwór, ponoć ostatni, " +
					"prowadzi bajkowo, zmierzając do pojednania. Czym jednak ono może być, gdy sprawcza moc magiczna przestaje " +
					"działać?"
		},
		{
			id: 2,
			title: "Dziady",
			description: "Epokowe wydarzenie: pierwszy raz w całości na scenie najważniejsze dzieło w historii polskiego teatru" +
					" – Dziady Adama Mickiewicza."
		}
	]
	
	$scope.handleSpectacleSelected = function(spectacleId){
		$state.go('reservation.stage', { id: spectacleId });
	}
			
	

//	$scope.getLimits = function(){
//		if($scope.selectedDate != undefined){
//			CategoryLimitSrv.getAllLimits({
//				'date' : $filter('date')($scope.selectedDate, "yyyy-MM-dd")
//			}, function(response) {
//				$scope.limits = response;
//			});
//		}
//		else{
//			AlertSrv.showError("Nieprawidłowy format daty");
//		}
//	}
//	
//	$scope.selectedDate = new Date();
//	$scope.getLimits();
//	
//	$scope.removeCategoryLimit = function(categoryLimit){
//		if(categoryLimit.limit != null){
//			ConfirmModalSrv.confirm("Usuwanie limitu dla kategorii", "Czy na pewno chcesz usunąć limit dla kategorii: \"" + categoryLimit.categoryName + "\"?", function(){
//				CategoryLimitSrv.remove({'categoryLimitId' : categoryLimit.limit.id}, function(){
//					$scope.getLimits();
//				});
//			});
//		}
//		else {
//			AlertSrv.showError("Dla podanej kategorii nie ma ustawionego limitu");
//		}
//	}
//	
//	$scope.openCategoryLimitModal = function (limitDTO, type) {
//
//	    var modalInstance = $uibModal.open({
//	      animation: true,
//	      templateUrl: '/app/categoryLimit/categoryLimitModalContent.html',
//	      controller: 'CategoryLimitModalCtrl',
//	      size : 'md',
//	      resolve: {
//	        type: function () {
//	          return type;
//	        },
//	    	limitDTO : function(){
//	    		return limitDTO;
//	    	}
//	      }
//	    });
//
//	    modalInstance.result.then(function() {
//	    	$scope.getLimits();
//	    });
//	};
//	
//	$scope.removeSubcategoryLimit = function(subcategoryLimit){
//		ConfirmModalSrv.confirm("Usuwanie limitu dla podkategorii", "Czy na pewno chcesz usunąć limit dla podkategorii: \"" + subcategoryLimit.subcategoryName + "\"?", function(){
//			SubcategoryLimitSrv.remove({'subcategoryLimitId' : subcategoryLimit.limit.id}, function(){
//				$scope.getLimits();
//			});
//		});
//	}
//
//	$scope.checkNull = function(value) {
//		if (value == null) {
//			return "-";
//		}
//
//		return $filter('number')(value, 2);
//	}
//
//	$scope.status = {
//		opened : false
//	};
//
//	$scope.open = function($event, which) {
//		$event.preventDefault();
//		$event.stopPropagation();
//
//		$scope.status.opened = true;
//	};
//	
//	$scope.monthPrev = function(){
//		var date = new Date($scope.selectedDate);
//		date.setMonth(date.getMonth() - 1);
//		$scope.selectedDate = date;
//		$scope.getLimits();
//	}
//	
//	$scope.monthNext = function(){
//		var date = new Date($scope.selectedDate);
//		date.setMonth(date.getMonth() + 1);
//		$scope.selectedDate = date;
//		$scope.getLimits();
//	}
//
//	$scope.assignProgressBarStatus = function(limitData) {
//		var currentValue = limitData.currentAmountOfExpenses;
//		var maxValue = limitData.limit.amount;
//		var warningValue = limitData.limit.warningAmount;
//
//		if (currentValue < warningValue) {
//			limitData.barType = 'success';
//			limitData.showWarning = false;
//		} else if (currentValue < maxValue) {
//			limitData.barType = 'warning';
//			limitData.showWarning = true;
//		} else {
//			limitData.barType = 'danger';
//			limitData.showWarning = true;
//		}
//	}
	
});