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
