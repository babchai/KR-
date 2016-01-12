angular.module('starter.directives', [])
.directive('header1', function() {
    return {

        restrict: 'AEC',
        template : '<ion-header-bar name="header1" align-title="left" class="bar bar-header bar-positive" >'+
                  '<md-button class="md-icon-button md-primary" aria-label="Settings" ui-sref="mylookbook-add">'+
                  '       <i class="ion-plus" style="font-size:30px ; color:#363636"></i>'+
                  '</md-button>'+
                   '<div class="title" style="text-align:center; font-size:30px; top:5px;">'+
                   '<img src="img/icon.png" style="height:100%;"/> </div>'+
                   '<md-button class="md-icon-button header-right-button" aria-label="Settings" ui-sref="location">'+
                    '<i class="ion-ios-location-outline" style="font-size:30px ; color:#363636"></i>'+
                    '</md-button>'+
                    '</ion-header-bar>',
        controller : function($scope, $element, $mdDialog){
           $scope.showMap = function(){

              $mdDialog.show({
                  templateUrl: 'templates/dialog.tpm.html',
                  parent: angular.element(document.body),
                  clickOutsideToClose:true
              })
              .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
              }, function() {
                  $scope.status = 'You cancelled the dialog.';
              });
           }
        }            
    }
})

.directive('header2', function() {
    return {
        restrict: 'AEC',
        
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div class="buttons header-left-button" >'+
                   '     <i class="ion-plus" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                     
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   '  <i class="ion-location" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('header3' , function($ionicHistory){
    return{
        restrict: 'AEC',
        link : function(scope, elem, attrs){
            scope.goBack = function(){
                $ionicHistory.goBack();

            }
        },
        template: '<ion-header-bar name="header3" align-title="left" class="bar bar-header bar-positive" no-tap-scroll="false">'+
                  '<div class="buttons header-left-button" ng-click="goBack()" style="width: 30px;height: 100%;">'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                  '<h1 class="header-center-title title " style="text-align:center; font-size:20px">'+
                  '  <i class="ion-android-favorite-outline" style="font-size:30px ; color:#363636 ; padding:5%" ng-click="love()" ng-show="!volted"></i>'+
                  '  <i class="ion-android-favorite" style="font-size:30px ; color:#363636 ; padding:5%" ng-click="unlove()"  ng-show="volted" ></i>'+
                  '  <i  class="ion-ios-upload-outline" style="font-size:30px ; color:#363636 ; padding:5%" ng-click="share()" ></i>'+
                  '</h1>'+
                  '<div class="buttons header-right-button" ng-click="goBack()">'+
                  '       <i class="ion-ios-arrow-right" style="font-size:30px ; color:#363636;     visibility: hidden;"  ></i>'+
                  '</div>'+
                  '</ion-header-bar>'
    }
})

.directive('header8' , function($ionicHistory){
    return{
        restrict: 'AEC',
        link : function(scope, elem, attrs){
            scope.goBack = function(){
                $ionicHistory.goBack();

            }
        },
        template: '<ion-header-bar name="header3" align-title="left" class="bar bar-header bar-positive" no-tap-scroll="false">'+
                  '<div class="buttons header-left-button" ng-click="goBack()" style="width: 30px;height: 100%;">'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                  '<h1 class="header-center-title title " style="text-align:center; font-size:20px">'+
                  '  <i class="ion-ios-star-outline" style="font-size:30px ; color:#363636 ; padding:5%" ng-click="love()" ng-show="!liked"></i>'+
                  '  <i class="ion-ios-star" style="font-size:30px ; color:#363636 ; padding:5%"  ng-show="liked" ng-click="unlove()" ></i>'+
                  '  <i  class="ion-ios-upload-outline" style="font-size:30px ; color:#363636 ; padding:5%" ng-click="share()" ></i>'+
                  '</h1>'+
                  '<div class="buttons header-right-button" style="width: 30px;height: 100%;padding-top: 2%;" ng-click="delete()">'+
                  '       <i class="ion-ios-trash-outline" style="font-size:30px ; color:#363636;""></i>'+
                  '</div>'+
                  '</ion-header-bar>'
    }
})

.directive('header4', function($ionicHistory){
    return{
        restrict:'AEC',
        link : function(scope, elem, attrs){
            scope.goBack = function(){
                $ionicHistory.goBack();

            }
        },
        template:'<ion-header-bar name="header4" align-title="left" class="bar bar-header bar-positive" no-tap-scroll="false">'+
                  '<div class="buttons header-left-button" ng-click="goBack()" style="width: 30px;height: 100%;">'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                  '<h1 class="header-center-title title " style="text-align:center; font-size:20px">'+
                  ' {{ title}}'+
                  '</h1>'+
                  '<div class="buttons header-right-button" >'+
                  '       <i class="ion-android-more-vertical" style="font-size:30px ; color:#363636;     visibility: hidden;"  ></i>'+
                  '</div>'+
                  '</ion-header-bar>'
    }
})

.directive('header5', function($ionicHistory) {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                console.log('goBack');
                $ionicHistory.goBack();

            }
        },
        template : '<ion-header-bar name="header5" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div  class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('header6', function($ionicHistory) {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                $ionicHistory.goBack();

            }
        },
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div  class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button"  style="width: 48px;height: 100%;padding-top: 2%;" >'+
                   '  <i class="ion-ios-search" style="font-size:30px ; color:#363636" ui-sref="search" ></i>'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('header7', function($ionicHistory) {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                $ionicHistory.goBack();

            }
        },
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div  class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   ' <button class="button cus-button" ng-click="saveImage()" ng-show="pic.before.length >0 || pic.after.length >0">Save</button>'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('footer', function(){
    return{
        controller: function($scope , $state){

          console.log($state.current.name);
        

          if($state.current.name == 'home')
            $scope.atHome = true;
          else if($state.current.name == "lookbook" || $state.current.name == "lookbook-sub" || $state.current.name == "lookbook-detail" || $state.current.name == "facematrix" || $state.current.name=="search")
            $scope.atLookbook  = true;
          else if($state.current.name == "mylookbook-add" || $state.current.name == "mylookbook" || $state.current.name == "mylookbook-all" ||  $state.current.name  == "mylookbook-detail" || $state.current.name == "mylookbook-favorite")
          {
            console.log('atMyLookbook')
            $scope.atMyLookbook  = true;
          }
          else if($state.current.name == 'myaccount' || $state.current.name == 'setting' || $state.current.name == 'tnc')
          {
            console.log('atSetting');
            $scope.atSetting = true;
          }
        },
        restrict:'AEC',
        template:'<ion-footer-bar name="footer" align-title="center" class="bar bar-footer bar-positive" >'+
                  '<h1 class="title" style="padding:0px">'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings" style="margin-right:5%; margin-left:5%" ui-sref="home">'+
                  '  <i class="ion-ios-home-outline"  ng-class="{footerIconSelected:atHome ,footerIcon:!atHome }"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings"  style="margin-right:5%; margin-left:5%"  ui-sref="lookbook">'+
                  '  <i class="ion-ios-personadd-outline"  ng-class="{footerIconSelected:atLookbook ,footerIcon:!atLookbook }"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings"  style="margin-right:5%; margin-left:5%" ui-sref="mylookbook-add">'+
                  '  <i class="ion-ios-person-outline" ng-class="{footerIconSelected:atMyLookbook ,footerIcon:!atMyLookbook }"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings"  style="margin-right:5%;  margin-left:5%" ui-sref="myaccount">'+
                  '  <i class="ion-ios-gear-outline"  ng-class="{footerIconSelected:atSetting ,footerIcon:!atSetting }"></i>'+
                  '</md-button>'+
                  '</h1>'+
                '</ion-footer-bar>'
    }
})


.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", '');
      });
    }
   }
   return fallbackSrc;
});
