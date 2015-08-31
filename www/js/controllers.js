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

.controller('mainCtrl' , function($scope, $rootScope){
    console.log('main controller');
     $rootScope.header = null;
    $rootScope.footer = null;
})

.controller('LoginCtrl', function($scope){
    console.log("login");
})
.controller('SignupCtrl', function($scope){
  $scope.title="SIGN UP";
  console.log("SignupCtrl"); 
})

.controller('ForgetPasswordCtrl',  function($scope){
  console.log("ForgetPasswordCtrl");  
  $scope.title = "FORGOT PASSWORD"
})
.controller('HomeCtrl',  function($scope , $rootScope){
    //$rootScope.header = 'header1';
    $rootScope.footer = 'footer1'; 
    $scope.title = "Kr+";
})

.controller('LookbookCtrl', function($scope, $rootScope){
   console.log("LookbookCtrl");
    $rootScope.footer = 'footer1'; 
    $scope.title = "Kr+ LOOKBOOK"

   
   $scope.find = function(){
      $scope.search = true;
   }
   $scope.cancelFind = function(){
      $scope.search = false;
   }

})
.controller('PromotionsCtrl', function($scope , $rootScope){
    console.log("PromotionsCtrl");
    //$rootScope.header = 'header4';
    $rootScope.footer = 'footer1'; 
    $scope.title = "PROMOTIONS"

})

.controller('TrendingCtrl' , function($scope , $rootScope){
   $scope.title = "TRENDING";

   var thumbArr = [];

    for(var i=119; i<131;i++)
    {
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

.controller('LoveitCtrl' , function($scope , $rootScope){
   $scope.title = "LOVE IT!";

   var thumbArr = [];

    for(var i=119; i<131;i++)
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

.controller('LookbookSubCtrl', function($scope, $rootScope ,$ionicLoading){

    $rootScope.footer = 'footer1'; 
    $scope.title = "Before & After"
    var thumbArr = [];
    for(var i=100; i<105;i++)
    {
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

.controller('LookbookDetailCtrl', function($scope , $stateParams , $rootScope){
  console.log("LookbookDetailCtrl");  
    $scope.title = "LOOKBOOK"

   $scope.image = parseInt($stateParams.image);

   $scope.nextImage = function(){
    console.log("swipe...");
      $scope.image = $scope.image +1;
   }
   //  var next = Math.floor((Math.random() * 8));
   //   $scope.image = images[next];
   // }
})

.controller('MyLookbookCtrl' , function($scope, $rootScope, $stateParams){
   $scope.title = 'My LOOKBOOK';

})

.controller('MyLookbookAddCtrl' , function($scope, $rootScope , $stateParams , $ionicActionSheet ,$timeout, Camera){
    
    $scope.images=[];

    $scope.pic={
       before:[
          'img/icon/upload-icon.png',
          'img/icon/upload-icon.png',
          'img/icon/upload-icon.png'
       ]
       ,
       after: [
          'img/icon/upload-icon.png',
          'img/icon/upload-icon.png',
          'img/icon/upload-icon.png'
      ]

    }

  // document.addEventListener("deviceready", function () {

  $scope.triggerAction = function(index){

       // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<b>Take From Camera</b>' },
         { text: 'Pick From Gallery' }
       ],
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
       }
     });

     // For example's sake, hide the sheet after two seconds
     // $timeout(function() {
     //   hideSheet();
     // }, 6000);
  }


  $scope.getPhotoBefore = function(index) {
     var option = {quality:80 , 
      //destinationType: Camera.DestinationType.FILE_URI,
      encodingType: 0,
      targetWidth: 1080,
      targetHeight: 1080,
       allowEdit : true,
      correctOrientation:true};
    Camera.getPicture(option).then(function(imageURI) {
      //console.log(imageURI);
      $scope.images[index] = imageURI;
      $scope.pic.before[index] = imageURI;
    }, function(err) {
      alert(err)
      $scope.images.push(err);
      console.err(err);
    })

    $cordovaCamera.cleanup();
  };

  $scope.getPhotoAfter = function(index) {
    var option = {quality:80 , 
      encodingType: 0,
       targetWidth: 1080,
      targetHeight: 1080,
       allowEdit : true,

      correctOrientation:true};
    Camera.getPicture(option).then(function(imageURI) {
      //console.log(imageURI);
      $scope.images[index] = imageURI;
      $scope.pic.after[index] = imageURI;
    }, function(err) {
      $scope.images.push(err);
      console.err(err);
    })
  };

// }, false);


  //  $scope.getPhotoBefore = function(index) {
  //    var option = {quality:50 , 
  //     //destinationType: Camera.DestinationType.FILE_URI,
  //     encodingType: 0,
  //     targetWidth: 350,
  //     correctOrientation:true};
  //   Camera.getPicture(option).then(function(imageURI) {
  //     //console.log(imageURI);
  //     $scope.images[index] = imageURI;
  //     $scope.pic.after[index] = imageURI;
  //   }, function(err) {
  //     alert(err)
  //     $scope.images.push(err);
  //     console.err(err);
  //   })
  // };

  // $scope.getPhotoAfter = function(index) {
  //   var option = {quality:50 , 
  //     destinationType: Camera.DestinationType.FILE_URI,
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 750,
  //     correctOrientation:true};
  //   Camera.getPicture(option).then(function(imageURI) {
  //     //console.log(imageURI);
  //     $scope.images[index] = imageURI;
  //     $scope.pic.after[index] = imageURI;
  //   }, function(err) {
  //     $scope.images.push(err);
  //     console.err(err);
  //   })
  // };

})

.controller('TileCtrl',  function($scope, $mdGridLayout){
  
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('VideoCtrl', function($scope , $rootScope){
      $scope.title = "VIDEO"

  console.log('VideoCtrl');
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
