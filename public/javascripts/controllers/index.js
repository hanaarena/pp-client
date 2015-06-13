var angular = require('angular');
var loginModule = require('./lib/login');
var listModule = require('./lib/list');

var controllersModule = angular.module('ppclient.controllers', [
	loginModule.name,
	listModule.name
]);
controllersModule.controller('MainCtrl', MainCtrl);

function MainCtrl($scope) {
}
MainCtrl.$inject = ['$scope'];

module.exports = controllersModule;
