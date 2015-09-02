$(function () {
    $('[data-toggle="popover"]').popover();
    $(".submenu-indicator").hide();
});

var app = angular.module("node_settings",[]);
app.controller("NodeSettingsController",["$scope",function($scope) {

    $scope.count = 0;
    $scope.clickid = null;
    $scope.temp = [];
    $scope.cluster_show = function(id){
        $scope.count++;
        if(id == $scope.all_btn){
            $scope.temp = [];
            for(var i=0;i<$scope.clusters.length;i++){
                $scope.temp.push($scope.clusters[i]);
            }
        }
        else{
            $scope.clickid = id;
            $scope.temp = [];
            $scope.temp.push($scope.clusters[id]);
        }

    };

    $scope.clusters = [
        {
            cluster_name: "Cluster1",
            cluster_ref: "cluster_1",
            cluster_machines: [
                {


                    machine_name: "Machine1",
                    machine_specs: {
                        Alpha_Config: "a",
                        Beta_config: "b"
                    },
                    machine_services: [
                        {
                            service_name : "Mesos",
                            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
                            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
                            service_config : undefined,
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
                    ]
                },
                {


                    machine_name: "Machine2",
                    machine_specs: {
                        Alpha_Config: "a",
                        Beta_config: "b"
                    },
                    machine_services: [
                        {
                            service_name : "Mesos",
                            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
                            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
                            service_config : undefined,
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
                    ]
                }
            ]
        },
        {
            cluster_name: "Cluster2",
            cluster_ref: "cluster_2",
            cluster_machines: [
                {


                    machine_name: "Machine1",
                    machine_specs: {
                        Alpha_Config: "a",
                        Beta_config: "b"
                    },
                    machine_services: [
                        {
                            service_name : "Mesos",
                            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
                            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
                            service_config : undefined,
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
                    ]
                },
                {


                    machine_name: "Machine2",
                    machine_specs: {
                        Alpha_Config: "a",
                        Beta_config: "b"
                    },
                    machine_services: [
                        {
                            service_name : "Mesos",
                            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
                            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
                            service_config : undefined,
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
                    ]
                },
                {


                    machine_name: "Machine3",
                    machine_specs: {
                        Alpha_Config: "a",
                        Beta_config: "b"
                    },
                    machine_services: [
                        {
                            service_name : "Mesos",
                            service_img_main : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
                            service_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
                            service_config : undefined,
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
                    ]
                }
            ]
        }
    ];
    $scope.all_btn = $scope.clusters.length + 1;
    console.log($scope.all_btn);

    if($scope.count == 0){
        for(var i=0;i<$scope.clusters.length;i++){
        $scope.temp.push($scope.clusters[i]);
        }
    }
}]);