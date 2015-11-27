(function($,UI) {
	var app = angular.module('winterCoppa',['ui.router','googlechart']);

	app.config(config);
	config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider'];

	function config($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {

		var teams = [417,405,404,406,407,399,403];
		$locationProvider.html5Mode({enabled:true});
		$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'/client/app/layout/home.html?rnd=12312ds12',
			controller:'homeCtrl',
			resolve : {
				data:['$http','$q',function($http,$q) {
					progress = 0;
					var teaminfo = {};
					angular.forEach(teams,function(value){
						teaminfo[value] = $http({
							method:'GET',
							url:'/Services/request.php?f=/api/v1/teams/get/'+value+'.json'

						});
						teaminfo[value].then(function(d){ addStatus(d.data.data.team.name);});
					});
					return $q.all(teaminfo);
				}]
			}
		})
		.state('home.details',{
			url:':rider{dummyParam:[/]?}',
			params:{
				rider: {
					value:null,
					squash:true
				}
			},
			controller:detailCtrl
		});


	};
	app.run(kickstart);
	kickstart.$inject = ['$state','$rootScope','$http'];
	function kickstart($state,$rootScope,$http){
		$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams){ 

			})


		$rootScope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){ 
				UI.Utils.scrollToElement(UI.$("body"),{});
				$rootScope.loading=false;   
				if(toParams.rider){
					$rootScope.loading=true;   
					angular.forEach($rootScope.riders,function(val){
						if(val.shortname == toParams.rider) {
							$rootScope.user=val;

						}
					});
				}

			});
		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			console.debug(error);

		});




	};
	app.controller('detailCtrl',detailCtrl);
	function detailCtrl($rootScope){

	}

	app.controller('homeCtrl',homeCtrl);
	homeCtrl.$inject = ['$scope','$rootScope','data','$location','$state'];
	function homeCtrl($scope,$rootScope,data,$location,$state) {
		$scope.teams = new Array();
		$scope.riders = new Array();
		$scope.goTo = function(url,$event) { window.open(url);}


		$scope.$location = $location;
		angular.forEach(data,function(value){
			var team = {};
			team.name = value.data.data.team.name;
			team.info = value.data.data.team;
			team.users = value.data.data.users;
			team.points = 0;
			team.entries = 0;
			angular.forEach(value.data.data.users,function(user){
				team.points = team.points+parseInt(user.points);
				team.entries = team.entries+parseInt(user.entries);
				user.points = parseInt(user.points);
				user.team=team;
				user.shortname = user.name.replace(/[öäüß\'\s]/g, function (m) {
					return {
						'ö': 'oe',
						'ä': 'ae',
						'ü':'ue',
						'ß':'ss',
						" ":'_',
						"'":''
					}[m];
				});
				if(user.shortname == $state.params.rider) $rootScope.user = user;
				$scope.riders.push(user);
			});
			$scope.teams.push(team);
			$rootScope.riders = $scope.riders;
		});


	}

	app.directive('ngAccordion',ngAccordion);
	function ngAccordion($timeout) {
		return {
			restrict:'A',
			link: function(scope,element,attrs) {
				var $element = $(element);

				$timeout(function() { UI.accordion($(element),{showfirst:false,collapse:false})},10);

			}
		}

	}

	app.directive('userInfo',userInfo);
	function userInfo($http,$rootScope) {

		return {
			restrict:'A',
			templateUrl:'/client/app/layout/login.html?rnd=34dews342',
			controller:function($scope) {
				var begin = new Date("2015-11-02").getTime();
				var diff = new Date().getTime()-begin;
				var diffDays = Math.round((diff)/(1000*60*60*24));
				var diffMinutes = diff/(1000*60);


				$rootScope.$watch('user',function(val){
					if($rootScope.user) populateUser(val);
				})




				function populateUser(data) {

					$scope.user 		= data;
					$scope.user.team 	= data.team;
					$scope.user.durationFormatted = $scope.user.duration.formatted();
					var percentage = Math.round(($scope.user.duration * 100 / diffMinutes)*100)/100;
					$scope.user.percentage = percentage.toLocaleString();
					var timePerDay = Math.round(($scope.user.duration / diffDays)*100) / 100;
					$scope.user.timePerDay = timePerDay.toString().formatted();
					var entriesPerDay = Math.round(($scope.user.entries / diffDays)*100)/100;
					$scope.user.entriesPerDay = entriesPerDay.toLocaleString();
				}

				String.prototype.formatted = function() {
					time = parseInt(this);
					var days = parseInt(time/24/60);
					var hours = parseInt(time/60%24);
					var minutes = parseInt(time%60);
					var duration = '';
					if(days) duration += days+ " Tag";
					if(days>1) duration += "e";
					if (days) duration += ", ";
					if(hours) duration += hours+" Stunde";
					if(hours>1) duration += "n";
					if(hours) duration += " und ";
					duration += minutes+" Minute";
					if(minutes>1) duration += "n";
					return duration;
					//return this;

				}
			}
		}

	}

	app.directive('myTeam',myTeam);
	function myTeam($rootScope) {
		return {
			restrict:'A',
			link:function(scope,element,attr){
				$rootScope.teamPlacing = parseInt(attr.myTeam)+1;
			}

		}

	}
	app.directive('me',me);
	function me($rootScope) {
		return {
			restrict:'A',
			link:function(scope,element,attr){
				//console.debug(attr);
				$rootScope.myPlacing=attr.me;
			}

		}

	}

	app.directive('meInTeam',meInTeam);
	function meInTeam($rootScope) {
		return {
			restrict:'A',
			link:function(scope,element,attr){
				//console.debug(attr);
				$rootScope.myTeamPlacing=attr.meInTeam;
			}

		}

	}

	app.directive("chart",chart);
	function chart($rootScope,$http) {
		return {
			restrict:'AE',
			scope:true,
			link:function(scope,element,attrs) {
				Date.prototype.addDays = function(days) {
       				var dat = new Date(this.valueOf())
       				dat.setDate(dat.getDate() + days);
       				return dat;
   				}


   				function getDates(startDate, stopDate) {
      				var dateArray = new Array();
      				var currentDate = startDate;
      				while (currentDate <= stopDate) {
        				dateArray.push(currentDate)
        				currentDate = currentDate.addDays(1);
      				}
      				return dateArray;
    			}
    			var dateArray = getDates(new Date("2015-11-02"),new Date);
    			var blankRows = [];
    			angular.forEach(dateArray,function(v){
    				blankRows.push({c:[{v:v},{v:0},{v:0},{v:0},{v:0}]});
    			});

				$rootScope.$watch('user',function(val){
					if(!$rootScope.user.eintraege) {
						scope.loading=true;
						$http.get('/Services/request.php?f=/api/v1/entries/user/'+val.id+'.json').then(function(d){
							var eintraege = {};
							scope.loading=false;
							angular.forEach(d.data.data,function(v){
								var date = new Date(v.entry.date);
								var category = v.category.id;
								if(eintraege[date]){
									if(eintraege[date][category]) {
										eintraege[date][category]=eintraege[date][category]+v.entry.points;
									}
									else eintraege[date][category] = v.entry.points;
								}
								else {
									eintraege[date]={};
									eintraege[date][category] = v.entry.points;
									eintraege[date].description = v.entry.description;
								}
            				});
							$rootScope.user.eintraege = eintraege;
							createGraph();
						});
					}
					else createGraph();
						
					
				})

				scope.chartObject = {};
				scope.chartObject.type = "ColumnChart";


				scope.chartObject.data = {"cols": [
					{id: "t", label: "Tage", type: "date"},
					{id: "r", label: "Radfahren", type: "number"},
					{id: "l", label: "Laufen", type: "number"},
					{id: "a", label: "Alternative Sportarten", type: "number"},
					{id: "s", label: "Ski Langlauf", type: "number"}

				]};

				scope.chartObject.data.rows = blankRows;

				scope.chartObject.options = {
					'title': 'Punkteverlauf',
					'isStacked':true,
					'hAxis':{title:'Tage'},
					'vAxis':{
						title:'Punkte',
						minValue:0,
						format:'#'
					},
					'animation':{
						duration:100
					}
				};

				function createGraph() {
					var graph = [];
					var user = $rootScope.user;
					angular.forEach(scope.chartObject.data.rows,function(v,k){
						if(user.eintraege[v.c[0].v]) {
							var eintrag = user.eintraege[v.c[0].v];
							scope.chartObject.data.rows[k]={c:[{v:v.c[0].v},{v:eintrag.radfahren|0},{v:eintrag.laufen|0},{v:eintrag.alternative_sportarten|0},{v:eintrag.skilanglauf|0}]};
						}
						else scope.chartObject.data.rows[k]= {c:[{v:v.c[0].v},{v:0},{v:0},{v:0},{v:0}]};

					});
				}
			}

		}

	}


	function addStatus(status) {
		$('#status').html($("#status").html()+" "+status);
		progress = parseInt(progress)+13;
	    //console.log(progress);
	    $("#progress").css("width",progress+"%");
	}

})(jQuery,jQuery.UIkit);