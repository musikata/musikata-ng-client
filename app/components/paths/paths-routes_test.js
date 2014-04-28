describe('paths:routes', function(){
  it('should map /path route to paths controller', function(){
    module('paths');
    inject(function($route){
      expect($route.routes['/path/:pathId/:nodeXPath'].controller).toBe('PathsController');
    });
  });
});
