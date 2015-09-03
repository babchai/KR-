angular.module('starter.directives', [])
.directive('header1', function() {
    return {

        restrict: 'AEC',
        template : '<ion-header-bar name="header1" align-title="left" class="bar bar-header bar-positive" >'+
                  '<md-button class="md-icon-button md-primary" aria-label="Settings">'+
                  '       <i class="ion-plus" style="font-size:30px ; color:#363636"></i>'+
                  '</md-button>'+
                   '<h1 class="title" style="text-align:center; font-size:30px; margin-top:10px"><img src="img/icon.png" style="width:50px"/> </h1>'+
                    '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                     '<i class="ion-ios-location-outline" style="font-size:30px ; color:#363636"></i>'+
                    '</div>'+
                    '</ion-header-bar>'
    }
})

.directive('header2', function() {
    return {
        restrict: 'AEC',
        
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div md-ink-ripple="" class="buttons header-left-button" >'+
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
                console.log('goBack');
                window.history.back();

            }
        },
        template: '<ion-header-bar name="header3" align-title="left" class="bar bar-header bar-positive" >'+
                  '<div md-ink-ripple="" class="buttons header-left-button" ng-click="goBack()">'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                  '<h1 class="header-center-title title " style="text-align:center; font-size:20px">'+
                  '  <i class="ion-android-favorite-outline" style="font-size:30px ; color:#363636 ; padding:5%"></i>'+
                  '  <i class="ion-ios-upload-outline" style="font-size:30px ; color:#363636 ; padding:5%"></i>'+
                  '</h1>'+
                  '</ion-header-bar>'
    }
})

.directive('header4', function(){
    return{
        restrict:'AEC',
        link : function(scope, elem, attrs){
            scope.goBack = function(){
                console.log('goBack');
                window.history.back();

            }
        },
        template:'<ion-header-bar name="header4" align-title="left" class="bar bar-header bar-positive">'+
                  '<div md-ink-ripple="" class="buttons header-left-button" ng-click="goBack()">'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                  '<h1 class="header-center-title title " style="text-align:center; font-size:20px">'+
                  ' {{ title}}'+
                  '</h1>'+
                  '</ion-header-bar>'
    }
})

.directive('header5', function() {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                console.log('goBack');
                window.history.back();

            }
        },
        template : '<ion-header-bar name="header5" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div md-ink-ripple="" class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('header6', function() {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                console.log('goBack');
                window.history.back();

            }
        },
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div md-ink-ripple="" class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   '  <i class="ion-ios-search" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('header7', function() {
    return {
        restrict: 'AEC',
         link : function(scope, elem, attrs){
            scope.goBack = function(){
                console.log('goBack');
                window.history.back();

            }
        },
        template : '<ion-header-bar name="header2" align-title="left"  class="bar bar-header bar-positive">'+
                   '<div md-ink-ripple="" class="buttons header-left-button" ng-click="goBack()" >'+
                  '       <i class="ion-ios-arrow-left" style="font-size:30px ; color:#363636"></i>'+
                   '</div>'+
                   '<h1 class="header-center-title title " style="text-align:center; font-size:20px">{{title}}</h1>'+
                   '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                   ' <button class="button cus-button">Save</button>'+
                   '</div>'+
                   '</ion-header-bar>'
    }
})

.directive('footer', function(){
    return{
        restrict:'AEC',
        template:'<ion-footer-bar name="footer" align-title="center" class="bar bar-footer bar-positive" >'+
                  '<h1 class="title" style="padding:0px">'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings">'+
                  '  <i class="ion-ios-home-outline" style="font-size:45px; padding:8%; color:#363636" ui-sref="home"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings">'+
                  '  <i class="ion-ios-personadd-outline"  style="font-size:45px; padding:8%; color:#363636" ui-sref="lookbook"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings">'+
                  '  <i class="ion-ios-person-outline" style="font-size:45px; padding:8%;color:#363636" ui-sref="mylookbook-add"></i>'+
                  '</md-button>'+
                  '<md-button md-ink-ripple class="md-icon-button md-primary" aria-label="Settings">'+
                  '  <i class="ion-ios-gear-outline" style="font-size:45px; padding:8%; color:#363636"></i>'+
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
