// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' , 'starter.directives', 'starter.services', 'ngMaterial','ionicLazyLoad' , 'ngCordova' , 'firebase' ])
.constant('$ionicLoadingConfig', {
  'duration':'12000' , 
  'hideOnStateChange' : true,
  'template' : '<ion-spinner icon="lines"></ion-spinner>'

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})




.config(function($stateProvider, $urlRouterProvider , $mdThemingProvider) {

  $mdThemingProvider.theme('default')
    .primaryPalette('grey')

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('setting', {
      url:'/setting',
      templateUrl:"templates/setting.html",
      controller: "SettingCtrl"
  })
  .state('signup', {
      url:'/signup',
      templateUrl : "templates/signup.html",
      controller: "SignupCtrl"
  })
  .state('login', {
    url:'/login',
    templateUrl : 'templates/login.html',
    controller: 'LoginCtrl',
     cache : false
  })
   .state('forgetPassword', {
    url:'/forgetPasssword',
    templateUrl : 'templates/forget-password.html',
    controller: 'ForgetPasswordCtrl'
  })
  .state('home', {
      cache : false,
      url:"/home",
      templateUrl:"templates/home.html",
      controller:"HomeCtrl"
  })
  .state('trending', {
    cache : false,
    url : "/trending",
    templateUrl:"templates/trending.html",
    controller:"TrendingCtrl"
  })
  .state('loveit', {
    cache : false,
    url : "/loveit",
    templateUrl:"templates/loveit.html",
    controller:"LoveitCtrl"
  })
  .state('lookbook-sub', {
    cache : false,
      url:"/lookbook-sub/:category",
      templateUrl:"templates/lookbook-sub.html",
      controller:"LookbookSubCtrl",
      params:{
        'cat':null
      }
  })
  .state('promotions', {
    cache : false,
      url:"/promotions",
      templateUrl:"templates/promotions.html",
      controller:"PromotionsCtrl"
  })
  .state('lookbook', {
    cache : false,
      url:"/lookbook",
      templateUrl:"templates/lookbook.html",
      controller:"LookbookCtrl"
  })
  .state('lookbook-detail', {
    cache : false,
      url:"/lookbook-detail/:category/:image",
      templateUrl:"templates/lookbook-detail.html",
      controller:"LookbookDetailCtrl"
  })

  .state('mylookbook', {
    cache : false,
      url:"/mylookbook",
      templateUrl:"templates/mylookbook.html",
      controller:"MyLookbookCtrl"
  })
  .state('mylookbook-add', {
    cache : false,
      url:"/mylookbook-add",
      templateUrl:"templates/mylookbook-add.html",
      controller:"MyLookbookAddCtrl"
  })

  .state('video', {
    cache : false,
      url:"/video",
      templateUrl:"templates/video.html",
      controller:"VideoCtrl"
  })
 
  .state('stylist' , {
    cache: false,
    url : "/stylist",
    templateUrl : "templates/stylist.html",
    controller:"StylistCtrl"
  })
 
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.trending', {
      url: "/trending",
      resolve : {
        authorize : ['authorization' , function(authorization){
          console.log("authorization");
          }
        ]
      },
      views: {
        'tab-trending': {
          templateUrl: "templates/tab-trending.html",
          controller: 'TrendingCtrl',

        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

});