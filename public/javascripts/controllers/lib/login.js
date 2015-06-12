/**
 * Created by lanz on 2015/6/11.
 */
var angular = require('angular');

var loginModule = angular.module('loginModule', []);

loginModule.controller('loginCtrl', [
	'$q',
	'$rootScope',
	'$scope',
	'$http',
	'$location',
	function ($q, $rootScope, $scope, $http, $location) {

		var CLIENT_ID = '416d4cd8a701b785040bc29cdd067ecd';
		var CLIENT_KEY = '99bae2161aa664595666a86c12545fb8e8ffe9f6';

		$http.defaults.headers.get = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};

		$http.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};

		$scope.$watch('$location.path()', function () {
			$scope.oAuthCb();
		});

		$scope.code = '';

		$scope.getURLParam = function (params) {
			var arr = decodeURI(location.search.substring(1)).split('&');
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i].substring(0, arr[i].indexOf('=')) == params) {
					return arr[i].substring(arr[i].indexOf('=')+1);
				}
			}
		};

		$scope.oAuthCb = function () {
			$scope.code = $scope.getURLParam('code');
			if ($scope.code) {
				console.log($scope.code);
				window.location.href = '/callback/' + CLIENT_ID + '/' + CLIENT_KEY + '/' + $scope.code;
				//var url = 'https://coding.net/api/oauth/access_token?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_KEY + '&grant_type=authorization_code&code=' + $scope.code;
				/*var deferred = $q.defer(); // Create Promise
				var url = 'https://coding.net/api/oauth/access_token';
				console.log(url);
				deferred.promise.xhr = $.ajax(url, {
					'dataType': 'jsonp',
					'traditional': true,
					'data': {
						client_id: CLIENT_ID,
						client_secret: CLIENT_KEY,
						grant_type: 'authorization_code',
						code: $scope.code
					},
					'timeout': 120000,
					'success': function (response, status, xhr) {
						try {
							console.log(xhr);
							if (response) {
								console.log(response);
								deferred.resolve(response, status, xhr);
							} else {
								console.log('success else condition');
								deferred.reject(response, status, xhr || 'unknown');
							}
						} catch (e) {
							console.log(e);
						}


						$rootScope.$apply();
					},
					'error': function (xhr, status, error) {
						var response = $.parseJSON(xhr.responseText);
						console.log(response);
						deferred.reject(response, status, xhr, error);

						$rootScope.$apply();
					}
				});*/
			} else {
				console.log('Cannot get return code');
			}
		};

		$scope.oAuth = function () {
			window.location.href = 'https://coding.net/oauth_authorize.html?client_id=' + CLIENT_ID + '&redirect_uri=http://localhost:3001/index&response_type=code&scope=all';
		};

		$scope.checkLogin = function () {
			console.log('init check');
		};

		$scope.checkLogin();
	}
]);

module.exports = loginModule;
