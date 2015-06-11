var angular = require("angular");
var controllersModule = require("./controllers");

var ppClient = angular.module("ppclient.app", [
    controllersModule.name
]);

module.exports = ppClient;
