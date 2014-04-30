var app = angular.module('musikata', [
  'paths'
])


// Very basic key:value local storage.
// Uses delete-on-pull to avoid memory leaks.
console.log('hre');
app.localStorage = angular.module('localStorage', []);

app.localStorage.factory('localStorage', function(){
  var storage = {};
  return {
    put: function(key, data){
      storage[key] = data;
    },
    pull: function(key){
      var data = storage[key];
      delete storage[key];
      return data;
    }
  };
});

app.paths = angular.module('paths',  ['ui.router', 'localStorage']);

app.paths.controller('PathsController', [
  '$scope',
  '$route', 
  '$routeParams',
  'PathRepository',

  function($scope, $route, $routeParams, PathRepository){
    $scope.pathId = $routeParams.pathId;
    $scope.nodeXPath = $routeParams.nodeXPath;

    if ($scope.pathId) {
      $scope.path = PathRepository.getPath($scope.pathId);

      if ($scope.nodeXPath) {
        $scope.pathNode = PathRepository.getPathNode($scope.pathId, $scope.nodeXPath);
      }
    }
  }
]);

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
