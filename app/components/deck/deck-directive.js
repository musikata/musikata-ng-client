app.deck.directive('deck', [function() {
  return {
    restrict: 'E',
    controller: 'DeckController',
    transclude: true,
    replace: true,
    template: '<div class="deck" ng-transclude></div>'
  };
}]);
