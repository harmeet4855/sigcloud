
$(function () {
    $('[data-toggle="popover"]').popover();
    $(".submenu-indicator").hide();
});



var app = angular.module("settings",[]);
app.controller("SettingsController",["$scope",function($scope){

    $scope.settings = [];
    $scope.counter = null;
    $scope.subcounter = null;
    $scope.settings = [
        {
            service_name : "Mesos",
            service_config : undefined,
            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
            service_subparts : [
                {
                    subpart_name : "Mesos master",
                    subpart_config : [
                        {
                            config : "MESOS_IP",
                            desc : "Private IP of the node",
                            type : "Address",
                            default : "10.240.0.0/16"
                        },
                        {
                            config : "MESOS_HOSTNAME",
                            desc : "Human-readable hostname for the node",
                            type : "String",
                            default : "cluster-name-1"
                        },
                        {
                            config : "MESOS_QUORUM ",
                            desc : "Specify the minimum masters active for retaining HA state",
                            type : "Int",
                            default : "2"
                        }
                    ]
                },
                {
                    subpart_name : "Mesos slave",
                    subpart_config : [
                        {
                            config : "MESOS_IP",
                            desc : "Private IP of the node",
                            type : "Address",
                            default : "10.240.0.0/16"
                        },
                        {
                            config : "MESOS_HOSTNAME",
                            desc : "Human-readable hostname for the node",
                            type : "String",
                            default : "cluster-name-1"
                        },
                        {
                            config : "MESOS_HADOOP_HOME_",
                            desc : "Location of hadoop installation on node for accessing hadoop binaries",
                            type : "String",
                            default : "/opt/hadoop"
                        }
                    ]
                }
            ]

        },
        {
            service_name : "Hadoop",
            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-20.svg",
            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-13.svg",
            service_config :[
                {
                    config : "NAMESERVICE",
                    desc : "An identifier for the HA cluster",
                    type : "String",
                    default : "Sigmoid"
                },
                {
                    config : "NAMENODE1",
                    desc : "Private IP of the active NN",
                    type : "String",
                    default : "node-1 IP"
                }
            ],
            service_subparts : []
        }
    ];

    $scope.arr=[];
    $scope.subarr=[];

    $scope.check = 0;
    $scope.submit_hide = 0;
    $scope.submit_show = 0;

    $scope.contains = function(a,obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i][0] === obj) {
                $scope.check=i;
                return true;
            }
        }
        return false;
    };


$scope.tabs = function(click_id) {
    console.log("len", $scope.arr.length);

    $scope.counter = click_id;
    console.log("to", click_id);

    if ($scope.arr.length !== 0) {

        if ($scope.contains($scope.arr, click_id)) {
            $scope.arr[$scope.check][1]++;
            console.log("A", $scope.arr);

        }

        else {
            $scope.arr.push([click_id, 1]);
            console.log("B", $scope.arr);
            $scope.check = click_id;
        }
    }

    if ($scope.arr.length === 0) {
        $scope.arr.push([click_id, 1]);
        console.log("yo", $scope.arr);
        $scope.check = click_id;
    }

    $scope.submit_hide = $scope.arr[$scope.check][1] % 2 ;
    $scope.submit_show = !($scope.submit_hide);
    console.log("velha",$scope.submit_show);
};


//$scope.subtabs = function(subclick_id) {
//    $scope.subcounter = subclick_id;
//    if ($scope.subarr.length !== 0) {
//
//        if ($scope.contains($scope.subarr, subclick_id)) {
//            $scope.subarr[$scope.check][1]++;
//        }
//
//        else {
//            $scope.arr.push([subclick_id, 1]);
//            $scope.check = subclick_id;
//        }
//    }
//
//    if ($scope.subarr.length === 0) {
//        $scope.subarr.push([subclick_id, 1]);
//        $scope.check = subclick_id;
//    }
//    $scope.subsubmit_hide = $scope.subarr[$scope.check][1] % 2 ;
//    $scope.subsubmit_show = !($scope.subsubmit_hide);
//};



//$scope.subtabs = function(subclick_id){
//    $scope.subcounter = subclick_id;
//    if($scope.subarr.length == 0){
//        $scope.subarr.push([subclick_id,1]);
//    }
//    console.log($scope.subarr);
//    for(var i=0;i<$scope.subarr.length;i++){
//        if(subclick_id != $scope.subarr[i][0]){
//            $scope.subarr.push([subclick_id,1]);
//            console.log($scope.subarr);
//        }
//        else{
//            $scope.subarr[i][1]++;
//            console.log($scope.subarr);
//        }
//    }
//}


}]);

