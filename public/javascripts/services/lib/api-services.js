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

		ApiService.ppReply = function (id, content) {
			var params = {
				content: content
			};

			var url = '/social/tweet/' + id + '/comment';

			return this.post(url, params, $.cookie('PP_CLIENT'));
		}

		ApiService.getCurrentUser = function (endpoint, token) {
			return ApiService.invoke(endpoint, null, token);
		};

		ApiService.post = function (endpoint, params, config) {
			return ApiService.invoke(endpoint, params, config);
		};

		ApiService.invoke = function (endpoint, params, token) {
			var deferred = $q.defer(); // Create Promise
			if (token) {
				var url = URL + endpoint + '?access_token=' + token;
			} else {
				var url = URL + endpoint;
			}
			console.log(url);
			deferred.promise.xhr = $.ajax(url, {
				'dataType': 'jsonp',
				'traditional': true,
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
