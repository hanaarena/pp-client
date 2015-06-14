/**
 * Created by lanz on 2015/6/11.
 */
var angular = require('angular');
var ApiService = require('../../services/lib/api-services');

var listModule = angular.module('listModule', [
	ApiService.name
]);

listModule.controller('listCtrl', [
	'$q',
	'$rootScope',
	'$scope',
	'$http',
	'ApiService',
	function ($q, $rootScope, $scope, $http, ApiService) {
		var ACCESS_TOKEN = '';

		$scope.getToken = function (token) {
			console.log(token);
			$rootScope.token = token;
			ACCESS_TOKEN = token;
			// domain may set to your own site
			$.cookie('PP_CLIENT', ACCESS_TOKEN, {path: "/", domain: '/', expires: 1});
		};

		$scope.$watch('token', function(token) {
			$scope.getToken(token);
		});
	}
]);

module.exports = listModule;
