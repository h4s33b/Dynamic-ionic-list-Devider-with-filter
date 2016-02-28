// Code goes here

var abc = angular.module("abc",[]);

abc.filter('groupByMonthYear', function($parse) {

		var dividers = {};

		return function(input) {
			if (!input || !input.length) return;
			
			input = input.sort(function(a,b){if(a.name.split(" ")[0] < b.name.split(" ")[0]) return -1;
				if(a.name.split(" ")[0] > b.name.split(" ")[0]) return 1;})
			
			var output = [], 
				previousElem, 
				currentElement;

			for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
				
				currentElement = item.name.slice( 0, 1 ).toUpperCase();
				if(!previousElem || currentElement != previousElem){
					var dividerId = currentElement;
					
					if (!dividers[dividerId]) {
						dividers[dividerId] = {
							isDivider: true,
							divider: currentElement,
							name : currentElement
						};
					}
					
					output.push(dividers[dividerId]);
					
				}
				output.push(item);

				previousElem = currentElement;
			}
			//output.sort(function(a, b){return a.name-b.name});
			return output;
		};

	}).directive('dividerCollectionRepeat', function($parse) {
		return {
			priority: 1001,
			compile: compile
		};

		function compile (element, attr) {
			var height = attr.itemHeight || '73';
    		attr.$set('itemHeight', 'item.isDivider ? 37 : ' + height);

			element.children().attr('ng-hide', 'item.isDivider');
			element.prepend(
				'<div class="item item-divider ng-hide" ng-show="item.isDivider" ng-bind="item.divider"></div>'
			);
		}
	}).controller('ItemController', function($scope) {
		$scope.vm = {};
			$scope.items = [
		{
          name: 'Auliet Test',
          num: '123568',
          time: 'Yesterday 4:59pm',
          status: 'in progress',
          image: 'incoming-call',
          type: 'contacts'
        },{
          name: 'Juliet Ericksson',
          num: '123568',
          time: 'Today 4:59pm',
          status: 'in progress',
          image: 'incoming-call',
          type: 'contacts'
        }
		,{
          name: 'Auliet Test',
          num: '123568',
          time: 'Yesterday 4:59pm',
          status: 'in progress',
          image: 'incoming-call',
          type: 'contacts'
        }
		];
		
		//console.log(typeof $scope.items);
		$scope.vm.items = $scope.items;
		console.log($scope.vm.items);

	});
	
	
	
	
	
	
	