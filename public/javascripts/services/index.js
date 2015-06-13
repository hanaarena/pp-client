var angular = require('angular');
var apiServiceModule = require('./lib/api-services');

var servicesModule = angular.module('ppclient.services', [
	apiServiceModule.name
]);
servicesModule.controller('MainService', MainService);

function MainService($scope) {
}
MainService.$inject = ['$scope'];

module.exports = servicesModule;
