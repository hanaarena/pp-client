var angular = require("angular");

var backyardModule = angular.module("ppc.controllers.backyard", []);
backyardModule.controller("BackyardCtrl", BackyardCtrl);

function BackyardCtrl($scope, $http) {
    $scope.login = function(username) {
        $http.get("//").then(function(response) {
			//- TODO
        }, function(e) {
	        //- TODO
        });
    };

    $scope.postPP = function() {
        $http.post("//", {
        }).then(function(response) {
	        //- TODO
        }, function(e) {
	        //- TODO
        });
    };
}
BackyardCtrl.$inject = ["$scope", "$http"];

module.exports = backyardModule;
