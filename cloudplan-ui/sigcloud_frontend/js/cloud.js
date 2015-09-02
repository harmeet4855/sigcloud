
(function() {
    var app = angular.module("cloud",[]);
    app.controller("cloudController", ["$scope", "$http", function ($scope, $http) {
        //$scope.result=null;
        $scope.instances = {};
        $scope.machine_types = [];
        $scope.images = [];
        $scope.regions = [];

        $scope.load_gce = function () {
            $http.get('http://localhost:8888/').
                success(function (result, status, headers, config) {
                    //alert("gce");
                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.machine_types = result.resources["google-compute-engine"]["machine-type"];
                    $scope.images = result.resources["google-compute-engine"]["image"];
                    $scope.regions = result.resources["google-compute-engine"]["region"];

                    $scope.instances = {
                        "machine_types": $scope.machine_types,
                        "images": $scope.images,
                        "regions": $scope.regions
                    }
                }).error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        };

    }]);

}());