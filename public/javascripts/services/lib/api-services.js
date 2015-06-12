var angular = require('angular');

var apiService = angular.module('ppclient.service.ApiService', []);

apiService.factory('ApiService', [
	'$q',
	'$rootScope',
	'$http',
	function ($q, $rootScope, $http) {
		//$http.defaults.headers.get = {
		//	'Content-Type': 'application/x-www-form-urlencoded'
		//};
		//
		//$http.defaults.headers.post = {
		//	'Content-Type': 'application/x-www-form-urlencoded'
		//};

		var ApiService = {};

		var URL = 'https://coding.net/api';

		ApiService.login = function (email, password) {
			var params = {
				email: email,
				password: password
			};
			return this.post('/account/login', params);
		};

		ApiService.post = function (endpoint, params, config) {
			return ApiService.invoke(endpoint, params);
		};

		ApiService.invoke = function (endpoint, params) {
			var deferred = $q.defer(); // Create Promise
			var url = URL + endpoint + '?callback=?';
			console.log(url);
			deferred.promise.xhr = $.ajax(url, {
				'dataType': 'jsonp',
				'contentType': 'application/x-www-form-urlencoded',
				'traditional': false,
				'data': params,
				"timeout": 120000,
				'success': function (response, status, xhr) {
					if (response) {
						console.log(response);
						deferred.resolve(response, status, xhr);
					} else {
						console.log('success else condition');
						deferred.reject(response, status, xhr || 'unknown');
					}

					$rootScope.$apply();
				},
				'error': function (xhr, status, error) {
					var response = $.parseJSON(xhr.responseText);
					console.log(response);
					deferred.reject(response, status, xhr, error);

					$rootScope.$apply();
				}
			});

			deferred.promise.abort = function () {
				deferred.reject({}, "aborted");
			};

			return deferred.promise;
		};
		return ApiService;
	}
]);

module.exports = apiService;
