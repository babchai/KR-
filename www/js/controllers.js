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


  $scope.login  = function(authorizationForm){
    $localstorage.setObject("userData", {})
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
        $state.go('home');

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
.controller('EditProfileCtrl', function($scope , $rootScope , $ionicHistory , $ionicLoading, $state , $mdDialog){
  
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
.controller('HomeCtrl',  function($scope , $rootScope , $ionicPlatform , $localstorage){
    //$rootScope.header = 'header1';
    $rootScope.footer = 'footer1'; 
    $scope.title = "kr+";
    $scope.promo = {};
   
     $ionicPlatform.onHardwareBackButton(function() {
     });
     
     var promo = $localstorage.getObject('promo');

    var promotionsRef = new Firebase("https://9lives.firebaseio.com/promotions");

    if(promo)
    {
      //console.log(promo.lastSeen);
      promotionsRef.once("value", function(snapshot) {
        var filter =   _.filter(snapshot.val(), function(data){
            //console.log(data.time , promo.lastSeen);
            return data.time > promo.lastSeen;
          });  
         $scope.promo.count = filter.length;
      });
      
      // promotionsRef.on("child_added", function(snapshot) {
      //   console.log(snapshot.val());
      //     var filter =   _.filter(snapshot.val(), function(data){
      //       //console.log(data.time , promo.lastSeen);
      //       console.log(data);
      //       return data.time > promo.lastSeen;
      //     }); 

      //     $scope.promo.count += filter.length;
      // });
    }



})

.controller('LookbookCtrl', function($scope, $rootScope , $mdDialog, $firebaseArray, $ionicLoading){

    $ionicLoading.show();

    $rootScope.footer = 'footer1'; 

    $scope.title = "kr+ LOOKBOOK"

    $scope.lookbook = {};
   
    var categoriesRef = new Firebase("https://9lives.firebaseio.com/categories");


    var categories = $firebaseArray(categoriesRef);

    categories.$loaded(function(data){
        $ionicLoading.hide();
        $scope.categories = data;
    })


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

    $scope.expand = function(type){
      // if($scope.lookbook.expand == true)
      //   $scope.lookbook.expand = false
      // else
      //   $scope.lookbook.expand = true;
      if(type == "stylist")
      {
        if($scope.lookbook.expandStylist == true)
          $scope.lookbook.expandStylist = false
        else
          $scope.lookbook.expandStylist = true;
      }
      else
      {
        if($scope.lookbook.expandFace == true)
          $scope.lookbook.expandFace = false
        else
          $scope.lookbook.expandFace = true;
      }
    }
  
    function DialogController ($scope, $mdDialog, items)
    {
      console.log('adad');
      $scope.items = items;
       console.log($scope.items);
    }
    //Cleanup the modal when we're done with it!


})
.controller('PromotionsCtrl', function($scope , $rootScope, $ionicLoading , $firebaseArray , $localstorage){
    //$rootScope.header = 'header4';
    $ionicLoading.show();
    $rootScope.footer = 'footer1'; 
    $scope.title = "PROMOTIONS";
 
     var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
    //$scope.promo = getObject('promo');

    var promoRef = new Firebase("https://9lives.firebaseio.com/promotions");
    $scope.promotions = $firebaseArray(promoRef);

    $scope.promotions.$loaded(function(data){
      $localstorage.setObject('promo',{'lastSeen': TIMESTAMP});
      $ionicLoading.hide();
    })
   
})

.controller('TrendingCtrl' , function($scope , $rootScope , $ionicLoading){

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

.controller('LoveitCtrl' , function($scope , $rootScope , $ionicLoading, $localstorage , $stateParams){

    $scope.title = "LOVE IT!";
    $ionicLoading.show();
    $rootScope.footer = 'footer1'; 
    $scope.thumbArr = [];
   
    var  loveRef = new Firebase("https://9lives.firebaseio.com/likes");


   //$scope.votes = $firebaseObject(voteRef);
   $scope.scroll = function(){
  
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


.controller('LookbookSubCtrl', function($scope, $rootScope ,$ionicLoading, $stateParams , $firebaseArray , $q){
    


    $scope.title = $stateParams.cat.name;



    $ionicLoading.show();
    console.log($stateParams.category);
    $scope.category = $stateParams.cat.key;
    $rootScope.footer = 'footer1'; 
    //$scope.title = "kr+ Lookbook"
    var thumbArr = [];
   
    var  lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook2/"+$scope.category);
    //var  scrollRef = new Firebase.util.Scroll(lookbookRef,'filename');
    
    var photos = $firebaseArray(lookbookRef);

    photos.$loaded(function(snapshot){
      $ionicLoading.hide();
        console.log(snapshot);
        snapshot.forEach(function(childSnaphot){
          console.log(childSnaphot);
          thumbArr.push({
             'key':childSnaphot.$id,
             'val':childSnaphot
           });
        });
        // snapshot.forEach(function(childSnaphot){
        //   console.log(childSnaphot.key() , childSnaphot.val());
        //   thumbArr.push({
        //     'key':childSnaphot.key(),
        //     'val':childSnaphot.val()
        //   });
        // });
         $scope.thumbs = chunk(thumbArr , 2);
    })
        
    // scrollRef.on("value", function(snapshot) {
    //   $ionicLoading.hide();

    //    snapshot.forEach(function(childSnaphot){
    //       //console.log(childSnaphot.key() , childSnaphot.val());
    //       thumbArr.push({
    //         'key':childSnaphot.key(),
    //         'val':childSnaphot.val()
    //       });
    //     });
    //     $scope.thumbs = chunk(thumbArr , 2);
    // });
 
    $scope.$watchCollection('thumbArr' , function(oldVal, newVal){
       
        //console.log(newVal , oldVal);
         console.log($scope.thumbArr);
         if($scope.thumbArr)
            $scope.thumbs = chunk($scope.thumbArr , 2);
     })  
    //scrollRef.scroll.next(10);
 

    $scope.loadMore = function()
    {
      console.log(scrollRef.scroll);
          $ionicLoading.show();

      console.log('loadMore');
     // scrollRef.scroll.next(10);
      //$scope.$broadcast('scroll.infiniteScrollComplete');


    }

    $scope.moreDataCanBeLoaded = function()
    {

      // var hasMore = scrollRef.scroll.hasNext();
      // return scrollRef.scroll.hasNext();
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
   $scope.tags ='';

 
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

      voteRef.child($stateParams.category+":"+imagename[0]+'/count').on('value' , function(snapshot){
        if(snapshot.val() === null)
            $scope.count = "0";
        else
          $scope.count = snapshot.val() + "";
      })
   

      $scope.nextID  = $stateParams.id;
      var lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook2/"+$stateParams.category+"");

      $scope.images = $firebaseArray(lookbookRef);
      
      $scope.images.$loaded(function(data){
          var current  = _.find($scope.images, {"filename":$stateParams.image});
          angular.forEach(current.tags , function(t){
              $scope.tags =  $scope.tags+'#'+t+" ";
          })
      })

      $scope.nextImage = function(direction){
        $scope.tags ='';
        var current = _.findIndex($scope.images , {'filename':$scope.image});
        if(direction == 'fwd')
        {
           angular.forEach($scope.images[current + 1].tags , function(t){
              $scope.tags =  $scope.tags+'#'+t+" ";
           })

          $scope.image = $scope.images[current + 1].filename; 
        }
        else
        {
          angular.forEach($scope.images[current - 1].tags , function(t){
              $scope.tags =  $scope.tags+'#'+t+" ";
           })
          $scope.image = $scope.images[current - 1].filename; 
        }

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

.controller('MyLookbookCtrl' , function($scope, $rootScope, $stateParams , $localstorage, $location , $state ){

   $scope.title = 'My LOOKBOOK';


   $scope.mylookbook = $localstorage.getArray('lookook');
   //console.log("lookbook :"  , $scope.mylookbook);
    // if($scope.mylookbook.length <=0);
    //    $state.go('mylookbook-add')

})

.controller('MyLookbookAllCtrl' , function($scope, $rootScope, $stateParams , $localstorage, $location){

   $scope.title = 'My LOOKBOOK';

   $scope.mylookbook = $localstorage.getArray('lookook');
   //console.log("lookbook :"  , $scope.mylookbook);

    $scope.thumbs = chunk($scope.mylookbook , 2);

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

.controller('MyLookbookFavoritelCtrl' , function($scope, $rootScope, $stateParams , $localstorage, $location){

   $scope.title = 'My LOOKBOOK';

   $scope.mylookbooks = $localstorage.getArray('lookook');
})

.controller('MyLookbookDetailCtrl' , function($scope, $rootScope, $stateParams , $localstorage, $location, $stateParams){

   $scope.title = 'My LOOKBOOK';

   $scope.photo = $stateParams.photo;

})

.controller('MyLookbookAddCtrl' , function($scope, $rootScope , $stateParams , $ionicActionSheet ,$timeout , $q, $mdBottomSheet , $mdDialog , $location, $localstorage, $cordovaFile,$ionicPlatform,Camera,$cordovaImagePicker){
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
          $scope.getPhotoBefore(index);
       }
       else
       {
          $scope.getLibrary(index);
       }
    });
  };

  $scope.getLibrary = function(index){

  var options = {
   maximumImagesCount: 1,
   width: 1080,
   height: 1080,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
       $rootScope.pic.before[index] = results[i];
      }
    }, function(error) {
      // error getting photos
       console.log('Error: ' + error);
    });

    
  }

  $scope.getPhotoBefore = function(index) {
     var option = {quality:50 , 
      //destinationType : Camera.DestinationType.DATA_URL,
      destinationType:1,
      encodingType: 0,
      targetWidth: 1080,
      targetHeight: 1080,
      allowEdit : true,
      correctOrientation:true,
      PictureSourceType:2,

      //saveToPhotoAlbum:true
    };


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
          .clickOutsideToClose(true)
          .title('My New Look')
          .content("New look saved.")
          .ok('Ok!')
        );
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
.controller('stylistListCtrl' , function($scope, $firebaseArray,$stateParams , $ionicPopup){
   $scope.title = $stateParams.cat.name;

  var firebaseRef = new Firebase("https://9lives.firebaseio.com/");

  $scope.category = $stateParams.cat.key;
  var stylistRef = firebaseRef.child('lookbook2/'+$stateParams.cat.key);
  $scope.stylists = $firebaseArray(stylistRef);

$scope.stylistDetail = function(id) {
      // An elaborate, custom popup
     console.log($scope.stylists[id]);

    var myPopup = $ionicPopup.show({
      cssClass : "stylist",
      template: '<div class="list card">'+
                  '<div class="item item-image">'+
                  '  <img src="http://krplus.com/lookbook/'+$scope.category+'/'+$scope.stylists[id].filename+'">'+
                  '</div>'+
                  '<div class="item item-text-wrap">'+
                  '<h3>'+$scope.stylists[id].name+'</h3>'+
                  ''+$scope.stylists[id].desc+''+
                  '</div>'+
                '</div>',
      scope: $scope,
      buttons: [
        { text: 'Close' },
      
      ]
    });
  }



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
.controller('VideoCtrl', function($scope , $rootScope, $firebase,$firebaseArray){
    $scope.title = "VIDEO"
    var firebaseRef = new Firebase("https://9lives.firebaseio.com/");
    var videoRef = firebaseRef.child('videos');
    $scope.videos = $firebaseArray(videoRef);

})

.controller('MyaccountCtrl' , function($scope , $localstorage,$location , $ionicLoading , $ionicPopup, $firebase , $mdBottomSheet , $cordovaImagePicker , Camera){
  $ionicLoading.show();
     $scope.title = "MY ACCOUNT"
     $scope.user = {}

     var authData =   $localstorage.getObject("userData");

     var profile = new Firebase("https://9lives.firebaseio.com/profile/"+$localstorage.getObject('userData').uid);
    
    //console.log("https://9lives.firebaseio.com/profile/"+$localstorage.getObject('userData').uid);
     profile.on('value' , function(snapshot){
       if(snapshot.val() !== null)
       {
          console.log(snapshot.val());
          $ionicLoading.hide();
          $scope.user = snapshot.val();
          //$scope.user.avatar = "img/avatar.png";
       }
     })

     $scope.setGender = function(gender){
        $scope.user.gender = gender;
        profile.update({
          'gender':$scope.user.gender
        })

     }

  $scope.updateAvatar = function(){

    $scope.showListBottomSheet(0);
  }

  $scope.editProfile = function() {
      console.log($scope.user.contact);
      var myPopup = $ionicPopup.show({
        template: ' <div class="login-wraper">'+
                  '   <input type="text"  class="login-textfield" ng-model="user.name"  placeholder="name" style="width:100%">'+
                  '</div>'+
                  '<div class="login-wraper">'+
                  '   <input type="text"  class="login-textfield" ng-model="user.contact" placeholder="contact no" style="width:100%">'+  
                  '</div>',
        scope: $scope,
        cssClass: 'custom-popup',
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'cus-button',
            onTap: function(e) {
              return true;
            }
          }
        ]
      });

       myPopup.then(function(res) {
        if(res)
        {
          $ionicLoading.show();
           profile.update({
              'name' : $scope.user.name,
              'contact': $scope.user.contact,
           }, function(error){
             $ionicLoading.hide();
            if (error) {
                alert("Error changing profile." + error.code);
              }
              else
              {
                alert("Profile changed successfully.")
              }
           })
         }
        console.log('Tapped!', res);
      });

  }

  $scope.showListBottomSheet = function(index) {
    console.log(index);
    //$scope.photoIndex = index;
    $mdBottomSheet.show({
      templateUrl: 'templates/bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      local : {photoIndex:index}
    }).then(function(action) {
      //console.log(action);
       if(action == 0)
       {
          $scope.getPhotoBefore(index);
       }
       else
       {
          $scope.getLibrary(index);
       }
    });
  };

  $scope.getLibrary = function(index){

  var options = {
   maximumImagesCount: 1,
   width: 1080,
   height: 1080,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
       $scope.user.avatar = results[i];
        profile.update({
          'avatar': $scope.user.avatar 
        })
      }
    }, function(error) {
      // error getting photos
       console.log('Error: ' + error);
    });

    
  }

  $scope.getPhotoBefore = function(index) {
     var option = {quality:50 , 
      //destinationType : Camera.DestinationType.DATA_URL,
      destinationType:1,
      encodingType: 0,
      targetWidth: 1080,
      targetHeight: 1080,
      allowEdit : true,
      correctOrientation:true,
      PictureSourceType:2,

      //saveToPhotoAlbum:true
    };


    Camera.getPicture(option).then(function(imageURI) {
      $scope.user.avatar = imageURI
      profile.update({
        'avatar': $scope.user.avatar 
      })
        // if(index < 3)
        //     $scope.user.avatar = imageURI;
        // else
        //   $rootScope.pic.after[index-3] = imageURI;
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


  })

.controller('SettingCtrl' , function($scope , $localstorage,$location , $ionicLoading , $ionicPopup, $firebase ,$ionicPush){
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
          //$scope.user.avatar = "img/avatar.png";
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

     $scope.changeNotification = function(){

       if(this.setting.notification)
       {
          $ionicPush.register({
            canShowAlert: true, //Can pushes show an alert on your screen?
            canSetBadge: true, //Can pushes update app icon badges?
            canPlaySound: true, //Can notifications play a sound?
            canRunActionsOnWake: true, //Can run actions outside the app,
            onNotification: function(notification) {
              // Handle new push notifications here
              // $log.info(notification);
              console.log(notification);
              return true;
            }
          });

       }

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
    //var  lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook/");

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
