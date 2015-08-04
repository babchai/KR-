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
})
.controller('PromotionsCtrl', function($scope){
    console.log("PromotionsCtrl");
})

.controller('LookbookDetailCtrl', function($scope){
  console.log("LookbookDetailCtrl"); 

   var images = [
    "https://s-media-cache-ak0.pinimg.com/236x/6e/da/f6/6edaf62380248cde1954413de20ad931.jpg",
    "http://thewowstyle.com/wp-content/uploads/2015/03/curly-hairstyles-2015-8.jpg",
    "https://s-media-cache-ak0.pinimg.com/236x/a8/15/e5/a815e5d47e93ee18ccbd897ec291b4d8.jpg",
    "http://imbbpullzone.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2013/09/Selena-Gomez-hairstyle-6.jpg",
    "http://i2.wp.com/therighthairstyles.com/wp-content/uploads/2015/01/1-feel-like-a-goddess-%E2%80%93-tall-curly-greek-style-wedding-updo.jpg?w=500",
    "https://s-media-cache-ak0.pinimg.com/736x/58/63/09/5863097920dcce210b4e7f5c4c4af5ff.jpg",
    "http://www.fashionandhairstyles.net/wp-content/uploads/2014/12/braid-hairstyles-1.jpg",
    "http://content.latest-hairstyles.com/wp-content/uploads/2014/07/Curly-Hairstyle-for-Summer-with-Side-Part-500x333-14346316773.jpg"
   ];

   $scope.image = images[1];

   $scope.nextImage = function(){
    var next = Math.floor((Math.random() * 8));
     $scope.image = images[next];
   }
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
