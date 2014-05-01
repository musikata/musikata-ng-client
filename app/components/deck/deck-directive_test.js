describe('deck', function() {
  var elm, $scope;

  var generateDeck = function(opts){
    inject(function($rootScope, $compile){
      opts = opts || {};
      var scope = opts.scope || {};
      elm = angular.element(
        '<div>' +
          '<deck slides="slides" current-slide-index="currentSlideIndex"></deck>' +
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

  it('should create slide elements for slides in scope', function(){
    testScope = { slides: ['a', 'b', 'c']};
    generateDeck({scope: testScope});
    var slides = elm.find('slide');
    expect(slides.length).toBe(3);
  });

  it('should show first slide by default', function(){
    this.fail('NOT IMPLEMENTED');
  });

  it('should show the current slide', function(){
    this.fail('NOT IMPLEMENTED');
  });

});
