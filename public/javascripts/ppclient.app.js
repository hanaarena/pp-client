var angular = require('angular');
var controllersModule = require('./controllers');
var servicesModule = require('./services');

var ppClient = angular.module('ppclient.app', [
    controllersModule.name,
	servicesModule.name
]);

module.exports = ppClient;
