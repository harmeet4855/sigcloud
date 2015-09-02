
$(".custom").mouseenter(function(){
	$(this).attr("ng-src","{{service.hover_img}}")
});

$(".custom").mouseleave(function(){
	$(this).attr("ng-src","{{service.img}}")
});



var app = angular.module("cart",["cloud"]);

app.controller("StoreController",function(){
	this.products = services ;
	this.bigproducts = bundles ;
	this.check = function(id){
		console.log("a",id);
		for(var i=0;i<bundles.length;i++){
			bundles[i].selected=false;
			console.log(bundles[i].selected);
		}
		bundles[id].selected = true;

	};


	//this.var = "services[pic_no].img";
    //
	//this.img_show = function(state,pic_no){
	//	if(state==0){
	//		this.var = services[pic_no].hover_img
	//	}
	//	else{
	//		this.var = services[pic_no].img
	//	}
	//}
});


//app.controller("FormController",function(){
//	this.products = services ;
//	this.bigproducts = bundles ;
//});

	app.controller('FormController', ['$scope', function($scope) {
		$scope.main_wrap={};
		$scope.beta_map = {};
		$scope.counter = 0;
		$scope.viz = false;
		$scope.main_wrap.grids  = [{
			"grid_name" : "Grid" + $scope.counter
		}];
		$scope.push_grid = function(){
			$scope.counter++;
			$scope.main_wrap.grids.push({
				"grid_name" : "Grid" + $scope.counter
			})
		};

		$scope.mech = function(){
			$scope.viz = true;
			$scope.store=JSON.parse($scope.beta_map).description;
			$scope.main_wrap.grids[$scope.counter].cluster_grid_machinetype = JSON.parse($scope.beta_map).name;
		}


	}]);

	var services =
	 [

	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-10.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-17.svg",
		 title : "Mesos",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			 id : "item1",
			 id1 : "item_p1"
	 },
	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-11.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-18.svg",
		 title : "Cassandra",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			 id : "item2",
			 id1 : "item_p2"

	 },
	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-12.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-19.svg",
		 title : "Elasticsearch",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			 id : "item3",
			 id1 : "item_p3"

	 },
	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-13.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-20.svg",
		 title : "Hadoop",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		 id : "item4",
		 id1 : "item_p4"

	 },
	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-14.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-21.svg",
		 title : "Kafka",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		 id : "item5",
		 id1 : "item_p5"

	 },
	 {
		 img : "../sigcloud_frontend/images/Modified logos/logos_round_b-15.svg",
		 hover_img : "../sigcloud_frontend/images/Modified logos/logos_round_w-22.svg",
		 title : "HBase",
		 description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		 id : "item6",
		 id1 : "item_p6"

	 }
	 ];

	var bundles =
		[

			{
				img : "../sigcloud_frontend/images/sample.jpg",
				title : "Bundle 1",
				description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				id : "Bundle1",
				selected : false
			},
			{
				img : "../sigcloud_frontend/images/sample.jpg",
				title : "Bundle 2",
				description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				id : "Bundle2",
				selected : false
			},
			{
				img : "../sigcloud_frontend/images/sample.jpg",
				title : "Bundle 3",
				description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				id : "Bundle3",
				selected : false
			},
			{
				img : "../sigcloud_frontend/images/sample.jpg",
				title : "Bundle 4",
				description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				id : "Bundle4",
				selected : false
			}
		];






	//
//var x = angular.module("sigcloud",[])
//
//x.controller('sigController',function($scope){
//
//	$scope.name="hi hello"



