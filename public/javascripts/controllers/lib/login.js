/**
 * Created by lanz on 2015/6/11.
 */
var angular = require('angular');
var ApiService = require('../../services/lib/api-services');

var loginModule = angular.module('loginModule', [
	ApiService.name
]);

loginModule.controller('loginCtrl', [
	'$q',
	'$rootScope',
	'$scope',
	'$http',
	'ApiService',
	function($q, $rootScope, $scope, $http, ApiService) {
	//$http.defaults.headers.post = {
	//	'Access-Control-Allow-Origin': 'localhost',
	//	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	//	'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
	//};
	//$http.defaults.useXDomain = true;

	$http.defaults.headers.get = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	$http.defaults.headers.post = {
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.submit = function() {

		ApiService.login($scope.email, $scope.pd)
			.then(function (response) {
				window.location.reload();
			}, function (response) {
				console.log(response);
			});

		// WARN: This will cause CORS
		//$http.post("https://coding.net/api/account/login", {
		//	email: $scope.email,
		//	password: $scope.pd
		//}).success(function(response) {
		//	console.log(response);
		//}).error(function(e) {
		//	console.log(e);
		//});

		// TEST
		console.log($http.defaults);
	};

	$scope.checkLogin = function () {
		console.log('init check');
	};

	$scope.checkLogin();
}]);

module.exports = loginModule;
