var angular = require("angular");
var backyardModule = require("./lib/backyard");
var editConfigModule = require("./lib/editConfig");
var previewModule = require("./lib/preview");

var controllersModule = angular.module("vanilla.controllers", [
  backyardModule.name,
  previewModule.name,
  editConfigModule.name
]);
controllersModule.controller("MainCtrl", MainCtrl);

function MainCtrl($scope) {
}
MainCtrl.$inject = ["$scope"];

module.exports = controllersModule;
