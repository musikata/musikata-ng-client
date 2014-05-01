app.deck.directive('slide', [function() {
  return {
    require: '^deck',
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '{{text}}',
    scope: {
      active: '=?',
      onShow: '&show',
      onHide: '&hide'
    },
    controller: function() {
      //Empty controller so other directives can require slide as parent.
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, deckCtrl) {
        scope.$watch('active', function(active) {
          if (active) {
            deckCtrl.goToSlide(scope);
          }
        });

        scope.disabled = false;
        if ( attrs.disabled ) {
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.show = function() {
          if ( !scope.disabled ) {
            scope.active = true;
          }
        };

        Ctrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}]);
