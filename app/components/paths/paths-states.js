app.paths.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('/foo', {
      params: ['storageKey'],
      template: 'glamber tar! {{title}}',
      controller: ['$scope', '$stateParams', 'localStorage', 
        function($scope, $stateParams, localStorage){
          var stateData = localStorage.pull($stateParams.storageKey);
          console.log("here", stateData);
          $scope.title = stateData.title;
        }
      ]
    });

  $urlRouterProvider
    .when('/path/:pathId/:nodeXPath', 
      ['$q', '$state', 'localStorage',
      function($q, $state, localStorage){
        console.log("path route");
        // Get node data asynchronously.
        // @TODO: replace faked below.
        var getNode = function(pathId, nodeXPath) {
          var fakeNode = {
            title: 'node title',
            route: 'someRoute'
          };
          var deferred = $q.defer();

          setTimeout(function() {
            deferred.resolve(fakeNode);
          }, 250);

          return deferred.promise;
        };

        getNode().then(function(node){
          // Transition to route based on node annotation.
          console.log("node is: ", node);
          var key = 'someKey';
          localStorage.put(key, node);
          $state.go('/foo', {storageKey: key}, {location: false});
        });

      }]
    );
}]);
