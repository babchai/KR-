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
     $rootScope.header = null;
    $rootScope.footer = null;
})

.controller('LoginCtrl', function($scope ,  $mdToast, $animate , $mdDialog , $rootScope, $location , $ionicLoading, $localstorage){
    var userData = "";
    $scope.user = {};


     var userRef = new Firebase("https://9lives.firebaseio.com");
  
     userData = userRef.getAuth();
     if(userData)
        $location.path('/home');


     userData = $localstorage.getObject('userData');

    if(typeof userData.token !='undefined')
    {
      $ionicLoading.show();
      userRef.authWithCustomToken(userData.token , function(error, newUserdata){
        $ionicLoading.hide();
        if(!error)
        {
          $localstorage.setObject("userData" , newUserdata);
          $location.path('/home');
        }
      });
    }


  $scope.login  = function(authorizationForm){
    if(!authorizationForm.$valid)
    {
       $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Login Failed')
          .content("Please fill in the Email and Password.")
          .ok('Got it!')
        );
      return
    }

    $ionicLoading.show();

    userRef.authWithPassword({
      email    : $scope.user.email,
      password : $scope.user.password
    }, function(error, authData) { 

      if( error )
      {
        $ionicLoading.hide();

        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Login Failed')
          .content("Couldn't sign in. The email or password is not correct.")
          .ok('Got it!')
        );
      }
      else
      {
        $ionicLoading.hide();
        $localstorage.setObject("userData" , authData);
        $location.path('/home');

      }

    }, {
      //remember: "sessionOnly"
    });
  }

  if($rootScope.registerSuccess)
  {
      $mdToast.show(
        $mdToast.simple()
          .content(' Welcome! Login to enjoy.')
          .position("top " )
          .hideDelay(2000)
        );

      $rootScope.registerSuccess = false;
  }

})
.controller('SignupCtrl', function($scope , $rootScope){
  $scope.title="SIGN UP";
  $scope.user = {};
  ///var ref = new Firebase("https://9lives.firebaseio.com");

  $scope.signup = function()
  {

      var userRef = new Firebase("https://9lives.firebaseio.com");
      userRef.createUser({
        email    : $scope.user.email,
        password : $scope.user.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {

          var profile = userRef.child("profile/"+userData.uid);
          
          var profileObj = {};

          profileObj = {
            'name' : $scope.user.name,
            'email' : $scope.user.email,
            'contact' : $scope.user.contact
          }

          profile.set(profileObj);

          $rootScope.registerSuccess = true;
          window.history.back();
          
        }
      });
  }

})

.controller('ForgetPasswordCtrl',  function($scope , $ionicLoading, $mdDialog){
 $scope.resetemail = '';
  $scope.title = "FORGOT PASSWORD"
  $scope.reset = function(form)
  {


    if(!form.$valid)
      return
     $ionicLoading.show();
    var ref = new Firebase("https://9lives.firebaseio.com");
    ref.resetPassword({
      email: this.resetemail
    }, function(error) {
      if (error) {
         $ionicLoading.hide();
        switch (error.code) {
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error resetting password:", error);
        }
      } else {
        $ionicLoading.hide();
        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Password Reset Successfully')
          .content("Password reset email sent successfully!")
          .ok('Got it!')
        );
        //console.log("Password reset email sent successfully!");
      }
    });


  }

})
.controller('HomeCtrl',  function($scope , $rootScope){
    //$rootScope.header = 'header1';
    $rootScope.footer = 'footer1'; 
    $scope.title = "kr+";
})

.controller('LookbookCtrl', function($scope, $rootScope){
    $rootScope.footer = 'footer1'; 
    $scope.title = "kr+ LOOKBOOK"

    $scope.lookbook = {};
   
   $scope.find = function(){
      $scope.search = true;
   }
   $scope.cancelFind = function(){
      $scope.search = false;
   }

    $scope.expand = function(){
      if($scope.lookbook.expand == true)
        $scope.lookbook.expand = false
      else
        $scope.lookbook.expand = true;
    }

})
.controller('PromotionsCtrl', function($scope , $rootScope){
    //$rootScope.header = 'header4';
    $rootScope.footer = 'footer1'; 
    $scope.title = "PROMOTIONS"

})

.controller('TrendingCtrl' , function($scope , $rootScope){
   $scope.title = "TRENDING";

   var thumbArr = [];

    for(var i=1000; i<1205;i++)
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

    for(var i=1000; i<1050;i++)
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
    $scope.title = "LOOKBOOK"

   $scope.image = parseInt($stateParams.image);

   $scope.nextImage = function(){
      $scope.image = $scope.image +1;
   }
   //  var next = Math.floor((Math.random() * 8));
   //   $scope.image = images[next];
   // }
})

.controller('MyLookbookCtrl' , function($scope, $rootScope, $stateParams){
   $scope.title = 'My LOOKBOOK';

})

.controller('MyLookbookAddCtrl' , function($scope, $rootScope , $stateParams , $ionicActionSheet ,$timeout, $mdBottomSheet , $mdDialog , $location, $cordovaFile,   Camera){
    $scope.title = 'My LOOKBOOK';
    $scope.images=[];

    //console.log(cordova.file.Pictures);

     $cordovaFile.checkDir(cordova.file.dataDirectory, "Pictures")
     .then(function (success) {
        // success
        console.log(success);
      }, function (error) {
        console.log(error);
        // error
      });

    // $cordovaFile.readAsText(cordova.file.externalDataDirectory, $scope.inputs.readFile)
    //   .then(function (success) {
    //     // success
    //   }, function (error) {
    //     // error
    //   });

    if(typeof $rootScope.pic == 'undefined')
    {
       $rootScope.pic={
          before: [],
          after: []
       }
    }

  $scope.showListBottomSheet = function(index) {
    //$scope.photoIndex = index;
    $mdBottomSheet.show({
      templateUrl: 'templates/bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      local : {photoIndex:index}
    }).then(function(action) {
      //console.log(action);
       if(action == 0)
       {
          $scope.getPhotoBefore(index)
       }
    });
  };

  $scope.getPhotoBefore = function(index) {
     var option = {quality:50 , 
      //destinationType: Camera.DestinationType.FILE_URI,

      encodingType: 0,
      targetWidth: 1080,
      targetHeight: 1080,
      allowEdit : true,
      correctOrientation:true};


    Camera.getPicture(option).then(function(imageURI) {
        if(index < 3)
            $rootScope.pic.before[index] = imageURI;
        else
          $rootScope.pic.after[index-3] = imageURI;
    }, function(err) {
      console.log(err);
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Camera Failed')
          .content("Opps! Something went wrong. Please try again.")
          .ok('Ok!')
        );
    })

    //$cordovaCamera.cleanup();
  };

  $scope.selectStylist = function(){
     $location.path('/stylist');
  }

  $scope.saveImage = function() {
    console.log($rootScope.pic.before[0]);
     var imageUrl = $rootScope.pic.before[0];
     console.log(imageUrl);
     var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
      var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
      var newName = makeid() + name;

      console.log(namePath, name);
      console.log(cordova.file.dataDirectory, newName);

      $cordovaFile.copyFile(namePath, name, cordova.file.externalDataDirectory, newName)
        .then(function(info) {
          console.log(info);
            $rootScope.pic.after[0] = info.nativeURL;
          //FileService.storeImage(newName);
          //resolve();
        }, function(e) {
          console.log(e);
          //reject();
        });
  }


  // 6
  function onCopySuccess(entry) {
    console.log(entry);

      $scope.$apply(function () {
          $scope.images.push(entry.nativeURL);
      });
  }

  function fail(error) {
      console.log("fail: " + error.code);
  }

  function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }


})

.controller('ListBottomSheetCtrl',  function($scope, $mdBottomSheet , $rootScope , Camera){

   $scope.items = [
    { name: 'Camera', icon: 'ion-camera' },
    { name: 'Gallery', icon: 'upload' },
   
  ];

  $scope.listItemClick = function($index) {
    $mdBottomSheet.hide($index);
  };
})

.controller('StylistCtrl' , function($scope , $mdDialog , $rootScope ){
   console.log('Stylist');
   $scope.title = "STYLIST";

   $scope.stylistDetail = function(id){
      console.log(id);
      $mdDialog.show({
        controller : TheChosenOne,
        templateUrl: 'templates/detail.tmp.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      })
      .then(function(answer) {
        //console.log(answer);
        $rootScope.stylist = answer; 
        window.history.back();
        //$scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        console.log('dialog closed.');
        //$scope.status = 'You cancelled the dialog.';
      });
   }

   function TheChosenOne($scope , $mdDialog)
   {
     $scope.chosen = function(answer)
     {
        console.log("clicked");
        $mdDialog.hide(answer);
     }
   } 

})

.controller('TileCtrl',  function($scope, $mdGridLayout){
  
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('VideoCtrl', function($scope , $rootScope){
      $scope.title = "VIDEO"

})

.controller('SettingCtrl' , function($scope , $localstorage,$location){
     $scope.title = "ACCOUNT SETTINGS"
     $scope.user = {}
    
         var authData =   $localstorage.getObject("userData");

     var profile = new Firebase("https://9lives.firebaseio.com/profile");
    


     $scope.logout = function(){
       var userRef = new Firebase("https://9lives.firebaseio.com");

        userRef.unauth();
        $localstorage.setObject("userData" , {});
         $location.path('/login');
     }
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
