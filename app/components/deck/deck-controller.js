app.deck.controller('DeckController', ['$scope', function($scope){
  var ctrl = this;

  $scope.slides = $scope.slides || [];
  $scope.currentSlideIndex = $scope.currentSlideIndex || 0;

  var currentSlide;

  ctrl.showSlide = function(slide){
    slide.active = true;
    slide.onShow();
  };

  ctrl.hideSlide = function(slide){
    currentSlide.active = false;
    currentSlide.onHide();
  };

  ctrl.goToSlide = function(slide) {
    if (currentSlide && (currentSlide !== slide)) {
      currentSlide.hideSlide();
    }
    ctrl.showSlide(slide);
    currentSlide = slide;
  };

  ctrl.goToNextSlide = function() {
    ctrl.goToSlideAt($scope.currentSlideIndex + 1);
  };

  ctrl.goToPreviousSlide = function() {
    ctrl.goToSlideAt($scope.currentSlideIndex - 1);
  };

  ctrl.goToSlideAt = function(slideIndex){
    var targetSlide = $scope.slides[slideIndex];
    $scope.currentSlideIndex = slideIndex;
    ctrl.goToSlide(targetSlide);
  };

}]);
