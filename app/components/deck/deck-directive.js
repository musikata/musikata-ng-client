app.deck.directive('deck', [function() {
  return {
    restrict: 'E',
    scope: {
      slides: '=',
      currentSlideIndex: '='
    },
    controller: 'DeckController',
    template: '<slide ng-repeat="slide in slides"></slide>',
  };
}]);
