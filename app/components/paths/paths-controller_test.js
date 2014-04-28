describe('PathsController', function(){
  var $rootScope;
  var $scope;
  var $routeParams;
  var generateController;

  var MockPathRepository = {
    getPath: function(pathId){
      console.log('getPath');
    }
  };

  beforeEach(function(){
    module('paths');

    // Setup mock PathRepository.
    module(function ($provide){
      $provide.service('PathRepository', function(){
        return MockPathRepository
      });
    });

    inject(function($injector){
      // Setup scope.
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();

      // Setup routeParams.
      $routeParams = {};

      // Get providers.
      var $controller = $injector.get('$controller');

      // Setup controller generator.
      generateController = function() {
        return $controller('PathsController', {
          $scope: $scope,
          $routeParams: $routeParams
        });
      };
    });
  });

  it('should get expected path from path repository', function(){
    spyOn(MockPathRepository, 'getPath');
    $routeParams.pathId = 'testPath';
    var controller = generateController();
    expect(MockPathRepository.getPath).toHaveBeenCalledWith('testPath');
  });
});
