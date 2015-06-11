var angular = require('angular');
var loginModule = require('./lib/login');

var controllersModule = angular.module('ppclient.controllers', [
	loginModule.name
]);
controllersModule.controller('MainCtrl', MainCtrl);

function MainCtrl($scope) {
}
MainCtrl.$inject = ['$scope'];

module.exports = controllersModule;
