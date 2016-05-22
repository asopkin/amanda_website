var mp4Controllers = angular.module('mp4Controllers', ['angular-parallax']);

mp4Controllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

mp4Controllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);

mp4Controllers.controller('passwordContentController', ['$scope', '$rootScope',  function($scope, $rootScope) {
  $scope.messages = [];
  console.log($scope.messages);
}]);

mp4Controllers.controller('AboutController', ['$scope', 'CommonData' , '$route', '$http', '$window', '$rootScope',  function($scope, CommonData, $route, $http, $window, $rootScope) {
  $scope.user = {};
  $scope.email = "";
  $scope.message = "";
  if(!$rootScope.messages){
    $rootScope.messages = [];
  }

  /**$scope.init = function () {
    console.log('parallaxin eyy');
    $('.parallax').parallax();
  };**/

/*document.getElementById("submit-button").onclick = function() {
    console.log('submitting');
    document.getElementById("email-form").submit();
 }*/

  $scope.update = function(new_user){
    console.log(new_user);
    showToast(new_user);
    $scope.formData = new_user;
    console.log("messages");
    $rootScope.messages.push(new_user);
    var content = new_user.toString();
    document.getElementById("email-form").submit();
    function showToast(new_user){
         if(new_user.email && new_user.name && new_user.message){
          Materialize.toast("Message received!", 4000);
        }
    }
  }


}]);

mp4Controllers.controller('MyMusicController', ['$scope', 'CommonData' , '$http', function($scope, CommonData, $http) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };
  $http.get("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sopsmusic&limit=1&api_key=f6c0e34e9d8209c4e40094346e8404be&format=json").success(function(data) {
      console.log("1 song");
      $scope.songs = data.recenttracks.track;
      console.log($scope.songs);
   });

  $http.get("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=sopsmusic&limit=20&api_key=f6c0e34e9d8209c4e40094346e8404be&format=json").success(function(data) {
      console.log("feed");
      console.log(data.recenttracks.track[0]);
      data.recenttracks.track.splice(0, 1);
      $scope.feed = data.recenttracks.track;
      console.log("mod feed");
      console.log(data.recenttracks.track[0]);
   });

  $scope.checkImage = function(imageVal){
    if(imageVal==undefined || imageVal==""){
      return true;
    }
    else{
      return false;
    }
  }

}]);

/** Birthday Controller **/

mp4Controllers.controller('BirthdayController', ['$scope', '$http', '$window' , function($scope, $http, $window) {
  
  /** Get birthdays from csv file */
  $.get('./data/birthdays/birthdays.txt', function(data) {
    process_csv(data);
   }, 'text');
  //process_csv(returnValue);
  var tarr = [];
  function process_csv(allText){
    var record_num = 2;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0,record_num);
    var birthdayDict = {};
    for(var i=1; i<allTextLines.length; i++){
      var thisValue = allTextLines[i];
      var thisValue = thisValue.split(',');
      var name = thisValue[0];
      var bday = thisValue[1];
      birthdayDict[name] = bday;
    }
    console.log("dict");
    console.log(birthdayDict);
  }
/* spinning wheel */


/* end wheel */
}]);

/* Projects Controller */

mp4Controllers.controller('ProjectsController', ['$scope', '$http', '$window' , function($scope, $http,  $window) {


}]);


mp4Controllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);
