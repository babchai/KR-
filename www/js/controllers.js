angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LoginCtrl', function($scope){
    console.log("login");
})
.controller('SignupCtrl', function($scope){
  console.log("SignupCtrl"); 
})

.controller('ForgetPasswordCtrl',  function(){
  console.log("ForgetPasswordCtrl");  
})
.controller('HomeCtrl',  function($scope){
  
})

.controller('LookbookCtrl', function($scope){
   console.log("LookbookCtrl");

   
   $scope.find = function(){
      $scope.search = true;
   }
   $scope.cancelFind = function(){
      $scope.search = false;
   }

})
.controller('PromotionsCtrl', function($scope){
    console.log("PromotionsCtrl");
})

.controller('LookbookSubCtrl', function($scope){
    var thumbArr = [];
    for(var i=100; i<145;i++)
    {
      //thumbArr.push('BOB - '+i+'.jpg');
      thumbArr.push(i);
    }

    $scope.thumbs = chunk(thumbArr , 2);



    function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }
})

.controller('LookbookDetailCtrl', function($scope , $stateParams){
  console.log("LookbookDetailCtrl"); 

  //console.log($stateParams.image);

 

   $scope.image = parseInt($stateParams.image);

   $scope.nextImage = function(){
      $scope.image = $scope.image +1;
   }
   //  var next = Math.floor((Math.random() * 8));
   //   $scope.image = images[next];
   // }
})
.controller('TileCtrl',  function($scope, $mdGridLayout){
  
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('TrendingCtrl', function($scope){
  console.log('trending');
  
  
})
.controller('VideoCtrl', function($scope){
  console.log('VideoCtrl');
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
