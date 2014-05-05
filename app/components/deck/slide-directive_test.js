describe('slide directive', function() {
  var elm, $scope;

  var generateSlide = function(opts){
    inject(function($rootScope, $compile){
      opts = opts || {};
      var scope = opts.scope || {};
      elm = angular.element(
        '<deck>' +
          '<slide></slide>' +
        '</deck>');

      $scope = $rootScope.$new();
      angular.extend($scope, scope);
      $compile(elm)($scope);
      $scope.$digest();
    });
  };

  // load the deck module
  beforeEach(module('deck'));

  it('should create slide', function(){
    generateSlide();
    var slide= elm.find('slide');
    expect(slide.length).toBe(1);
  });

});
