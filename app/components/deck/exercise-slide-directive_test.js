ddescribe('exercise-slide-directive', function() {
  var elm, $scope;

  var generateExerciseSlide = function(opts){
    inject(function($rootScope, $compile){
      opts = opts || {};
      var scope = opts.scope || {};
      var defaultTemplate = '<deck>' +
        '<slide exercise-slide></slide>' +
        '</deck>';
      var template = opts.template || defaultTemplate;
      elm = angular.element(template);

      $scope = $rootScope.$new();
      angular.extend($scope, scope);
      $compile(elm)($scope);
      $scope.$digest();
    });
  };

  // load the deck module
  beforeEach(module('deck'));

  it('should create exercise slide', function(){
    generateExerciseSlide();
    var slide = angular.element(elm[0].querySelector('.slide'));
    expect(slide.length).toBe(1);
  });

  ddescribe('widget interaction', function(){
    var template;
    beforeEach(function(){
      angular.module('deck').directive('dummyWidget', function(){
        return {
          restrict: 'AE',
          replace: true,
          scope: {
            'onEvaluated': '&onEvaluated'
          },
          template: '<div class="dummy-widget">' +
            '<button ng-click="onEvaluated()">Click Me</button>' + 
            '</div>'
        }
      });

      template = '<deck>' +
        '<slide exercise-slide>' +
        '<div dummy-widget on-evaluated="onEvaluated()"></div>' +
        '</slide>' +
        '</deck>';

    });

    iit("should trigger 'onEvaluated' when content is evaluated", function(){
      generateExerciseSlide({
        template: template
      });
      var slide = angular.element(elm[0].querySelector('.slide'));
      var slideScope = slide.scope();
      var evaluatedSpy = jasmine.createSpy('evaluated');
      slideScope.onEvaluated = evaluatedSpy;
      elm.find('button').triggerHandler('click');
      expect(evaluatedSpy).toHaveBeenCalled();
    });
  })

});
