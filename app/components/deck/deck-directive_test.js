describe('deck', function() {
  var elm, $scope;

  var generateDeck = function(opts){
    inject(function($rootScope, $compile){
      opts = opts || {};
      var scope = opts.scope || {};
      elm = angular.element(
        '<div>' +
          '<deck></deck>' +
        '</div>');

      $scope = $rootScope.$new();
      angular.extend($scope, scope);
      $compile(elm)($scope);
      $scope.$digest();
    });
  };

  // load the deck module
  beforeEach(module('deck'));

  it('should create deck', function(){
    generateDeck();
    var deck = elm.find('deck');
    expect(deck.length).toBe(1);
  });

});
