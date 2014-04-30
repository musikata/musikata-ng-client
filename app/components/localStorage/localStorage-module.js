// Very basic key:value local storage.
// Uses delete-on-pull to avoid memory leaks.
app.localStorage = angular.module('localStorage', []);

app.localStorage.factory('localStorage', function(){
  var storage = {};
  return {
    put: function(key, data){
      storage[key] = data;
    },
    pull: function(key){
      var data = storage[key];
      delete storage[key];
      return data;
    }
  };
});
