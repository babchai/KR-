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

.controller('LoginCtrl', function($scope ,  $mdToast, $animate , $mdDialog , $rootScope, $location , $ionicLoading, $localstorage,$state){
    var userData = {};
    $scope.user = {};
     //$state.go('home');
     
     var userRef = new Firebase("https://9lives.firebaseio.com");
  
     userData = userRef.getAuth();
     $localstorage.setObject('userData', userData);

     if(userData)
        $state.go('home');
        //$location.path('/home');

     
  //   userData = $localstorage.getObject('userData');

  //  if(userData !== null)
  //  {
  //   if(typeof userData.token !='undefined')
  //   {
  //     $ionicLoading.show();
  //     userRef.authWithCustomToken(userData.token , function(error, newUserdata){
  //       $ionicLoading.hide();
  //       if(!error)
  //       {
  //         $localstorage.setObject("userData" , newUserdata);
  //         $location.path('/home');
  //       }
  //     });
  //   }
  // }



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
.controller('SignupCtrl', function($scope , $rootScope , $ionicHistory , $ionicLoading, $state , $mdDialog){
  $scope.title="SIGN UP";
  $scope.user = {};
  ///var ref = new Firebase("https://9lives.firebaseio.com");

  $scope.setGender = function(gender)
  {
    $scope.user.gender = gender;
  }
  
  $scope.signup = function()
  {
    $ionicLoading.show();
      var userRef = new Firebase("https://9lives.firebaseio.com");
      userRef.createUser({
        email    : $scope.user.email,
        password : $scope.user.password
      }, function(error, userData) {
        if (error) {
          $ionicLoading.hide();

          var message = "Sorry. Signup failed."
          if(error.code == "EMAIL_TAKEN")
          {
            message = "Sorry. Email already taken. Please use another email. ";
          }
          else if(error.code == "INVALID_EMAIL")
          {
            message = "Sorry. The specified email is invalid.";
          }


          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Signup Failed')
              .content(message)
              .ok('Got it!')
          );

          console.log("Error creating user:", error);
        } else {

           $ionicLoading.hide();
          var profile = userRef.child("profile/"+userData.uid);
          
          var profileObj = {};

          profileObj = {
            'name' : $scope.user.name,
            'email' : $scope.user.email,
            'contact' : $scope.user.contact,
            'gender' : $scope.user.gender
          }

          profile.set(profileObj);

          $rootScope.registerSuccess = true;
          $state.go('login');
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
.controller('HomeCtrl',  function($scope , $rootScope , $ionicPlatform){
    //$rootScope.header = 'header1';
    $rootScope.footer = 'footer1'; 
    $scope.title = "kr+";

     $ionicPlatform.onHardwareBackButton(function() {
        //event.preventDefault();
        //event.stopPropagation();
        
        //alert('exit?');


     });
})

.controller('LookbookCtrl', function($scope, $rootScope , $mdDialog){
    $rootScope.footer = 'footer1'; 

    $scope.title = "kr+ LOOKBOOK"

    $scope.lookbook = {};
   
   $scope.find = function(){
      $scope.search = true;
   }
   $scope.cancelFind = function(){
      $scope.search = false;
   }


   $scope.faceMatric = function(items){
    $scope.items = items;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/face.tmp.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        locals: {
           items: $scope.items
         },
      })
      .then(function(answer) {
        //console.log(answer);
        //$scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        console.log('dialog closed.');
        //$scope.status = 'You cancelled the dialog.';
      });
   }

    $scope.expand = function(){
      if($scope.lookbook.expand == true)
        $scope.lookbook.expand = false
      else
        $scope.lookbook.expand = true;
    }
  
    function DialogController ($scope, $mdDialog, items)
    {
      console.log('adad');
      $scope.items = items;
       console.log($scope.items);
    }
    //Cleanup the modal when we're done with it!


})
.controller('PromotionsCtrl', function($scope , $rootScope, $ionicLoading , $firebaseArray){
    //$rootScope.header = 'header4';
    $ionicLoading.show();
    $rootScope.footer = 'footer1'; 
    $scope.title = "PROMOTIONS";

    var promoRef = new Firebase("https://9lives.firebaseio.com/promotions");
    $scope.promotions = $firebaseArray(promoRef);

    $scope.promotions.$loaded(function(data){
      $ionicLoading.hide();
    })
   //  $scope.$watch('promoRef', function(newVal , oldVal) {
   //     console.log(newVal , oldVal);
   // });

})

.controller('TrendingCtrl' , function($scope , $rootScope , $ionicLoading  ,$ionicScrollDelegate){
      //$ionicScrollDelegate.scrollTop(false);

   $scope.title = "TRENDING";

    $ionicLoading.show();
    $rootScope.footer = 'footer1'; 
    $scope.thumbArr = [];
   
    var  trendingRef = new Firebase("https://9lives.firebaseio.com/likes");

    trendingRef.orderByChild("count").limitToFirst(50).on("value", function(snapshot) {
        $ionicLoading.hide();

        console.log(snapshot.val());
        snapshot.forEach(function(childSnaphot){
          //console.log(childSnaphot.key() , childSnaphot.val());
          $scope.thumbArr.push({
            'key':childSnaphot.key(),
            'val':childSnaphot.val()
          });
        });
        $scope.thumbs = chunk($scope.thumbArr.reverse() , 2);

        
    });

    $scope.$watchCollection('thumbs' , function(){
      console.log($scope.thumbs);
    })

    
    function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    $scope.getPath = function(path)
    {
      var arr = path.split(':');
      return arr[0]+"/"+arr[1];
    }
})

.controller('LoveitCtrl' , function($scope , $rootScope , $ionicLoading, $localstorage , $stateParams, $ionicScrollDelegate){
    //$ionicScrollDelegate.scrollTop(false);

    $scope.title = "LOVE IT!";
    $ionicLoading.show();
    $rootScope.footer = 'footer1'; 
    $scope.thumbArr = [];
   
    var  loveRef = new Firebase("https://9lives.firebaseio.com/likes");


   //$scope.votes = $firebaseObject(voteRef);
   $scope.scroll = function(){
      //$ionicScrollDelegate.scrollBottom();
      //$ionicScrollDelegate.scrollTo(0,10, 100);
      //console.log($ionicScrollDelegate.getScrollView());
   }
    loveRef.orderByChild("uid")
    .on("value", function(snapshot) {
        $ionicLoading.hide();
        //console.log(snapshot.val());
        snapshot.forEach(function(childSnaphot){
          if(_.find(childSnaphot.val().by , {'uid':$localstorage.getObject('userData').uid})){
              //console.log(childSnaphot.key());
              var data = childSnaphot.key().split(':');
              console.log(data); 
              $scope.thumbArr.push({
                'category':data[0],
                'filename':data[1]
              })
          };

       
        });
        console.log($scope.thumbArr);

        $scope.thumbs = chunk($scope.thumbArr , 2);  
      });
   


    // $scope.$watchCollection('thumbs' , function(){
    //   console.log($scope.thumbs);
    // })

    
    function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    $scope.getPath = function(path)
    {
      var arr = path.split(':');
      return arr[0]+"/"+arr[1];
    }

})


.controller('LookbookSubCtrl', function($scope, $rootScope ,$ionicLoading, $stateParams , $firebaseArray , $ionicScrollDelegate, $q){
    
    //$ionicScrollDelegate.scrollTop(false);

    switch($stateParams.category){
    case 'before_and_after' :
        $scope.title = "Before & After"
      break;
    case 'blow_out_bar':
      $scope.title = "Blow Out Bar"
    break;
    case 'curly_hair_style':
      $scope.title = " Curly Hair Style"
    break;
    case 'celebrity_hair_style':
      $scope.title = "Celebrity Hair Style"
    break;
    case 'men_hair_style':
      $scope.title = "Men Hair Style"
    break;
    case 'straight_hair_style':
      $scope.title = "Straight Hair Style"
    break;
    case 'updo_hair_style':
      $scope.title = "Updo Hair Style"
    break;
    case 'type-a':
      $scope.title = "Type A (oval/restangle)"
    break;
    case 'type-b':
      $scope.title = "Type B (square/round)"
    break;
    case 'type-c':
      $scope.title = "Type C (diamond)"
    break;
    case 'type-d':
      $scope.title = "Type D (triangle)" 
    break;
    case 'type-e':
      $scope.title = "Type E (inverted triangle)"
    break;

    }


    $ionicLoading.show();
    console.log($stateParams.category);
    $scope.category = $stateParams.category;
    $rootScope.footer = 'footer1'; 
    //$scope.title = "kr+ Lookbook"
    var thumbArr = [];
   
    var  lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook/"+$stateParams.category+"/photos");
    var  scrollRef = new Firebase.util.Scroll(lookbookRef,'filename');
    
        
    scrollRef.on("value", function(snapshot) {
      console.log(snapshot.key());
      $ionicLoading.hide();

       snapshot.forEach(function(childSnaphot){
          //console.log(childSnaphot.key() , childSnaphot.val());
          thumbArr.push({
            'key':childSnaphot.key(),
            'val':childSnaphot.val()
          });
        });
        $scope.thumbs = chunk(thumbArr , 2);

      // $scope.thumbArr = {
      //   'key' : snapshot.key(),
      //   'val' : snapshot.val()
      // }
    });
 
    $scope.$watchCollection('thumbArr' , function(oldVal, newVal){
       
        //console.log(newVal , oldVal);
         console.log($scope.thumbArr);
         if($scope.thumbArr)
            $scope.thumbs = chunk($scope.thumbArr , 2);
     })  
    scrollRef.scroll.next(20);
 

    $scope.loadMore = function()
    {
          $ionicLoading.show();

      console.log('loadMore');
      scrollRef.scroll.next(20);
      $scope.$broadcast('scroll.infiniteScrollComplete');


    }

    $scope.moreDataCanBeLoaded = function()
    {

      var hasMore = scrollRef.scroll.hasNext();
      return scrollRef.scroll.hasNext();
    }
    
    //$scope.thumbs = chunk(thumbArr , 2);

    function chunk(arr, size) {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        var a = arr.slice(i, i+size);
        newArr.push(arr.slice(i, i+size));
      }
      //console.log(newArr);
      return newArr;
    }
})

.controller('LookbookDetailCtrl', function($scope , $stateParams , $rootScope , $cordovaSocialSharing , $localstorage , $firebaseArray , $firebaseObject , $ionicPlatform){
    $scope.title = "LOOKBOOK"
  //console.log($stateParams)
   $scope.image = $stateParams.image;
   $scope.category = $stateParams.category;
   $scope.votes = [];

 
   var imagename = $stateParams.image.split('.');
   var  voteRef = new Firebase("https://9lives.firebaseio.com/likes");

   $scope.votes = $firebaseObject(voteRef);

   

    if($localstorage.getObject('userData') )
    {
      voteRef.child($stateParams.category+":"+imagename[0]+"/by").orderByChild('uid').startAt($localstorage.getObject('userData').uid).once('value', function(data){
         if(data.val()!==null)
            $scope.volted = true;
         else
           $scope.volted = false;
      });
    }



   // if($stateParams.id)
   // {
   // }

      voteRef.child($stateParams.category+":"+imagename[0]+'/count').on('value' , function(snapshot){
        if(snapshot.val() === null)
            $scope.count = "0";
        else
          $scope.count = snapshot.val() + "";
      })
   

      $scope.nextID  = $stateParams.id;
      var lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook/"+$stateParams.category+"/photos");

      $scope.images = $firebaseArray(lookbookRef);
      

      $scope.nextImage = function(direction){

        var current = _.findIndex($scope.images , {'filename':$scope.image});
        if(direction == 'fwd')
          $scope.image = $scope.images[current + 1].filename; 
        else
          $scope.image = $scope.images[current - 1].filename; 

        var i = $scope.image.split('.');

        if($scope.votes[$scope.category+':'+i[0]] !== undefined){
            console.log( $scope.votes[$scope.category+':'+i[0]] );
             if($scope.votes[$scope.category+':'+i[0]].count > 0)
             {
                $scope.count = $scope.votes[$scope.category+':'+i[0]].count;
                //console.log($scope.count);
             }
             else
             {
                $scope.count = 0;
                //console.log($scope.count);
             }

            var uid = $localstorage.getObject('userData').uid;
            var find = _.find($scope.votes[$scope.category+':'+i[0]].by , {"uid":uid});
            console.log(find);
            if( find ===null || find === undefined )
            {
               $scope.volted = false;
            }
            else
            {
              $scope.volted = true;
            }

        }
        else
        {
          $scope.volted = false;
          $scope.count = 0;
        }
      
      }

   var message ="message";
   var subject = "subject";
   var link = "";
   var  file = "http://krplus.com/lookbook/"+$stateParams.category+"/"+$scope.image;

   $scope.love = function(){
      $scope.volted = true;
      var imagename = $scope.image.split('.');
      console.log($stateParams.category+":"+imagename[0]+"/count");
      voteRef.child($stateParams.category+":"+imagename[0]+"/count").transaction(function(current_value){
            count = (current_value || 0) + 1
            $scope.count = count;
            return count; 
      });
      
      var uid = $localstorage.getObject('userData').uid;
      voteRef.child($stateParams.category+":"+imagename[0]+"/by").push({'uid':uid});
      //$scope.$apply();
   }

  $scope.share = function(){
  $ionicPlatform.ready(function() {
    $cordovaSocialSharing
    .share(message, subject, file, link) // Share via native share sheet
    .then(function(result) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Social Share')
          .content("Share successfully.")
          .ok('Ok!')
        );
      
    }, function(err) {
      console.log('err');
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Social Share')
          .content("Share failed. Please try again.")
          .ok('Ok!')
        );
    });

  });


   }
   
})

.controller('MyLookbookCtrl' , function($scope, $rootScope, $stateParams , $localstorage, $location){

   $scope.title = 'My LOOKBOOK';

   $scope.mylookbook = $localstorage.getArray('lookook');
   console.log("lookbook :"  , $scope.mylookbook);

})

.controller('MyLookbookAddCtrl' , function($scope, $rootScope , $stateParams , $ionicActionSheet ,$timeout , $q, $mdBottomSheet , $mdDialog , $location, $localstorage, $cordovaFile, $ionicPlatform,    Camera){
    $scope.title = 'My LOOKBOOK';
    $scope.images=[];

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
    $q.all([
    angular.forEach($rootScope.pic.before, function(photo , key){
      createFileEntry(photo);
    }),
    angular.forEach($rootScope.pic.after, function(photo2 , key){
      createFileEntry(photo2);
    })
    ]).then(function(val){
      console.log(val);
      $rootScope.pic={
          before: [],
          after: []
       }
       $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('My New Look')
          .content("New look saved.")
          .ok('Ok!')
        );
      
      console.log('Saved.');
    })
  }

  function createFileEntry(imageUrl) {
  
     var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
      var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
      var newName = makeid() + name;

     
      $ionicPlatform.ready(function() {
        $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
          .then(function(info) {
            console.log("success",info);
            var library =  $localstorage.getArray('lookook');
            library.push({
               'stylist' : $rootScope.stylist,
               'date'    :new Date(),
               'photo'   : cordova.file.dataDirectory+newName
            });
            $localstorage.setArray('lookook', library);
            console.log(library);

          }, function(e) {
            console.log("Failed" , e);
            //reject();
          });
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

.controller('SettingCtrl' , function($scope , $localstorage,$location , $ionicLoading , $ionicPopup, $firebase){
  $ionicLoading.show();
     $scope.title = "ACCOUNT SETTINGS"
     $scope.user = {}

    
      var authData =   $localstorage.getObject("userData");

     var profile = new Firebase("https://9lives.firebaseio.com/profile/"+$localstorage.getObject('userData').uid);
    
    //console.log("https://9lives.firebaseio.com/profile/"+$localstorage.getObject('userData').uid);
     profile.on('value' , function(snapshot){
       if(snapshot.val() !== null)
       {
         $ionicLoading.hide();
          $scope.user = snapshot.val();
          $scope.user.avatar = "img/avatar.png";
       }
     })

     $scope.setGender = function(gender){
        $scope.user.gender = gender;
        profile.update({
          'gender':$scope.user.gender
        })

     }

     $scope.logout = function(){
       var userRef = new Firebase("https://9lives.firebaseio.com");

        userRef.unauth();
        $localstorage.setObject("userData" , {});
        $location.path('/login');
     }

    $scope.changePassword = function() {
      $scope.password = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: ' <div class="login-wraper">'+
                  '<input type="password"  class="login-textfield" ng-model="password.oldPassword" placeholder="Existing Password" style="width:100%"> '+
                  '</div>'+
                   ' <div class="login-wraper">'+
                  '<input type="password"  class="login-textfield" ng-model="password.newPassword" placeholder="New Password" style="width:100%">'+
                  ' </div>'+
                  ' <div class="login-wraper">'+
                  '<input type="password"  class="login-textfield" ng-model="password.confirmPassword" placeholder="Confirm  Password" style="width:100%">'+
                  ' </div>',
        scope: $scope,
        cssClass: 'custom-popup',
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'cus-button',
            onTap: function(e) {
              if ($scope.newPassword != $scope.confirmPassword) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                  return true;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        if(res)
        {
          $ionicLoading.show();
           var userRef = new Firebase("https://9lives.firebaseio.com");
           userRef.changePassword({
              'email' : $scope.user.email,
              'oldPassword': $scope.password.oldPassword,
              'newPassword' : $scope.password.newPassword
           }, function(error){
             $ionicLoading.hide();
            if (error) {
                switch (error.code) {
                  case "INVALID_PASSWORD":
                    alert("Error changing password. The specified user account password is incorrect.");
                    break;
                  default:
                     alert("Error changing password");
                }
              }
              else
              {
                alert("Password changed successfully.")
              }
           })
         }
        console.log('Tapped!', res);
      });

     };
  })

.controller('SearchCtrl', function($scope , $firebaseArray , $ionicLoading , $ionicHistory , $firebaseObject , $state) {
    $scope.search = {};
    $ionicLoading.show();

    var tagsRef = new Firebase("https://9lives.firebaseio.com/tags");
    var  lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook/");

    //var lookbook = $firebaseArray(lookbookRef);

    $scope.tags = $firebaseArray(tagsRef);

  
    $scope.tags.$loaded(function(data){
      $ionicLoading.hide();
    })

    $scope.$watchCollection('search.tag', function(newVal , oldVal){
       if($scope.search.tag !='')
       {
          $scope.search.result =   _.filter($scope.tags ,function(res) {
            return res.$id.indexOf($scope.search.tag)>=0;
          })
        }
    })

    $scope.stringify = function(j)
    {
      return JSON.stringify(j);
    }

    $scope.cancel = function()
    {
      console.log('goBack');
      $ionicHistory.goBack();
    }

    $scope.redirect =function(obj)
    {
      console.log(obj);
      $state.go('search_result' , { 'tag': obj.$id, 'link':obj.Links});
    }

})
.controller('SearchResultCtrl' , function($scope , $stateParams){

       var thumbArr = [];
       var links = $stateParams.link;
       $scope.title = "#"+$stateParams.tag; 

      angular.forEach(links ,  function(data){
        thumbArr.push(data);
      })

      $scope.thumbs = chunk(thumbArr , 2);

      function chunk(arr, size) {

      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        var a = arr.slice(i, i+size);
        newArr.push(arr.slice(i, i+size));
      }
      console.log(newArr);
      return newArr;
    }

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
