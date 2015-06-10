var angular = require("angular");
var controllersModule = require("./controllers");

var ppClient = angular.module("ppc.app", [
    controllersModule.name
]);

module.exports = ppClient;
