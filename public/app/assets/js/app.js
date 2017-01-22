var app = angular.module('TheatreApp', [ 'ngResource', 'ui.router', 'ta.sprectacle', 'ta.stage', 'ta.reservation']);


app.config(function($stateProvider, $urlRouterProvider) {
		
    $stateProvider
    .state('home', {
    	url: '/',
    	templateUrl: "assets/views/home/home.html"
    })
    .state('reservation', {
    	url: '/reservation',
    	abstract: true,
    	templateUrl: "assets/views/reservation/reservation-template.html"
    })
    .state('reservation.spectacles', {
    	url: '/spectacle',
    	controller: 'SpectacleCtrl',
    	templateUrl: "assets/views/reservation/spectacles.html"
    })
    .state('reservation.stage', {
    	url: '/spectacle/:id',
    	controller: 'StageCtrl',
    	templateUrl: "assets/views/reservation/stage.html"
    })
    .state('reservation.reservationsList', {
        url: '/reservations-list',
        controller: 'ReservationCtrl',
        templateUrl: "assets/views/reservation/reservations.html"
    });
    
    $urlRouterProvider.otherwise("/");

});

