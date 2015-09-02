
    var app = angular.module("monitor",[]);
    app.controller("MonitorController",["$scope","$http",function($scope,$http){
        //$scope.result=null;
        $scope.temparray = [];
        $scope.clusters = [];
        $scope.clickid=null;
        $scope.subclickid = null;
        $scope.len = 0;
        $scope.subclickparentid = $scope.len;
        $scope.counter = 0;


        $scope.cluster_show = function(id){
            $scope.clickid = id;
        };

        $scope.clustmech_len = null;

        $scope.machine_show = function(parentid,id){
            $scope.subclickid = id;
            $scope.subclickparentid = parentid;
            console.log("beta",$scope.subclickid);
            console.log("papa",$scope.subclickparentid);
        };

        $scope.content_update1= function() {
            $http.get('http://localhost:8888/?t=' + Math.random()).
                success(function(result, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                        $scope.clusters = [
                            {
                                cluster_name: "Cluster1",
                                cluster_ref: "cluster_1",
                                cluster_status: 1,
                                cluster_machines: [
                                    {


                                        machine_name: "Machine1",
                                        machine_status: 0,
                                        machine_services: [
                                            {
                                                service_name:  "HTTP",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["HTTP"]

                                            },
                                            {
                                                service_name:  "SSH",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["SSH"]

                                            },
                                            {
                                                service_name:  "PING",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["PING"]

                                            },
                                            {
                                                service_name:  "Swap Usage",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["Swap Usage"]

                                            }
                                        ]
                                    },
                                    {


                                        machine_name: "Machine2",
                                        machine_status: 0,
                                        machine_services: [
                                            {
                                                service_name:  "HTTP",
                                                service_status: 0,
                                                service_specs:  result.content.localhost.services["HTTP"]

                                            },
                                            {
                                                service_name:  "SSH",
                                                service_status: 0,
                                                service_specs:  result.content.localhost.services["SSH"]

                                            },
                                            {
                                                service_name:  "PING",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["PING"]

                                            }
                                        ]
                                    }
                                ]
                            },

                            {
                                cluster_name: "Cluster2",
                                cluster_ref: "cluster_2",
                                cluster_status: 0,
                                cluster_machines: [
                                    {


                                        machine_name: "Machine1",
                                        machine_status: 0,
                                        machine_services: [
                                            {
                                                service_name:  "HTTP",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["HTTP"]

                                            },
                                            {
                                                service_name:  "SSH",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["SSH"]

                                            },
                                            {
                                                service_name:  "PING",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["PING"]

                                            }
                                        ]
                                    },
                                    {


                                        machine_name: "Machine2",
                                        machine_status: 0,
                                        machine_services: [
                                            {
                                                service_name:  "HTTP",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["HTTP"]

                                            },
                                            {
                                                service_name:  "SSH",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["SSH"]

                                            },
                                            {
                                                service_name:  "PING",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["PING"]

                                            }
                                        ]
                                    },
                                    {


                                        machine_name: "Machine3",
                                        machine_status: 0,
                                        machine_services: [
                                            {
                                                service_name:  "HTTP",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["HTTP"]

                                            },
                                            {
                                                service_name:  "SSH",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["SSH"]

                                            },
                                            {
                                                service_name:  "PING",
                                                service_status: 1,
                                                service_specs:  result.content.localhost.services["PING"]

                                            }
                                        ]
                                    }
                                ]
                            }


                        ];
                    //console.log("O",$scope.clusters);
                    //$scope.clusters.pop();
                    //console.log("t",$scope.clusters);



                    for(var i=0;i<$scope.clusters.length;i++){
                        if($scope.clickid == i){
                            $scope.temp = [];
                            $scope.temp.push($scope.clusters[i]);
                            $scope.clusters = [];
                            $scope.clusters.push($scope.temp[0]);
                            break;
                        }
                    }

                    for(var i=0;i<$scope.clusters.length;i++){ //2
                        var clust_arr = [];
                        for(var j=0;j<$scope.clusters[i].cluster_machines.length;j++){ //2 -- 3
                            var arr = [];
                            for(var k=0;k<$scope.clusters[i].cluster_machines[j].machine_services.length;k++){ // 4 --- 3
                                if($scope.clusters[i].cluster_machines[j].machine_services[k].service_specs.current_state==0){
                                    arr[k] = 0;
                                    //break;
                                }
                                else if($scope.clusters[i].cluster_machines[j].machine_services[k].service_specs.current_state==1){
                                    arr[k] = 1;
                                    //break;
                                }
                                else{
                                    arr[k] = 2;
                                    //break;
                                }
                            }

                            $scope.clusters[i].cluster_machines[j].machine_status = Math.max.apply(Math,arr);

                            if($scope.clusters[i].cluster_machines[j].machine_status==0){
                                clust_arr[j] = 0;
                                //break;
                            }
                            else if($scope.clusters[i].cluster_machines[j].machine_status==1){
                                clust_arr[j] = 1;
                                //break;
                            }
                            else{
                                clust_arr[j] = 2;
                                //break;
                            }

                        }
                        $scope.clusters[i].cluster_status = Math.max.apply(Math,clust_arr); ;
                    }


                    $scope.len = $scope.clusters.length;
                    $scope.clustmech_len = $scope.clusters[$scope.subclickparentid].cluster_machines.length;

                    for(var i=0;i<$scope.clusters[$scope.subclickparentid].cluster_machines.length;i++){
                        if($scope.subclickid == i){
                            $scope.temp = [];
                            $scope.temp.push($scope.clusters[$scope.subclickparentid].cluster_machines[i]);
                            $scope.clusters[$scope.subclickparentid].cluster_machines = [];
                            $scope.clusters[$scope.subclickparentid].cluster_machines.push($scope.temp[0]);
                            break;
                        }
                    }




                }).error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        };


        $scope.content_update1();
        setInterval($scope.content_update1,3000);

    }]);

    //{{service.service_status == 0 ? "OK" : (1 ? "WARNING" : "DANGER")}}

    //{{cluster.cluster_status == 0 ? "OK" : (1 ? "WARNING" : "DANGER")}}