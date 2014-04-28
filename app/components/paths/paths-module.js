app.paths = angular.module('paths',  ['ngRoute']);

app.paths.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/path/:pathId/:nodeXPath', {
    controller: 'PathsController'
  });
}]);
