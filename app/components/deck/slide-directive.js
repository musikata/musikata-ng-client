app.deck.directive('slide', [function() {
  return {
    require: '^deck',
    restrict: 'EA',
    transclude: true,
    replace: true,
    template: '<div class="slide" ng-transclude></div>',
    controller: function() {
      //Empty controller so other directives can require slide as parent.
    },
  };
}]);
