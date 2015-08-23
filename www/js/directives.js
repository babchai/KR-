angular.module('starter.directives', [])
.directive('header1', function() {
    return {
        restrict: 'AEC',
        template : '<ion-header-bar name="header1" align-title="left" class="bar bar-header bar-positive" >'+
                  '<div md-ink-ripple="" class="buttons header-left-button">'+
                  '       <i class="ion-plus" style="font-size:30px ; color:#363636"></i>'+
                  '</div>'+
                   '<h1 class="title" style="text-align:center; font-size:30px">{{title}}</h1>'+
                    '<div md-ink-ripple="" class="buttons header-right-button" style="right: 15px;">'+
                     '<i class="ion-location" style="font-size:30px ; color:#363636"></i>'+
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

.directive('footer', function(){
    return{
        restrict:'AEC',
        template:'<ion-footer-bar name="footer" align-title="center" class="bar bar-footer bar-positive" >'+
                  '<h1 class="title" style="padding:0px">'+
                  '  <i class="ion-ios-home-outline   " style="font-size:45px; padding:8%; color:#363636"></i>'+
                  '  <i class="ion-ios-personadd-outline" style="font-size:45px; padding:8%; color:#363636"></i>'+
                  '  <i class="ion-ios-person-outline" style="font-size:45px; padding:8%;color:#363636"></i>'+
                  '  <i class="ion-ios-gear-outline" style="font-size:45px; padding:8%; color:#363636"></i>'+
                  '</h1>'+
                '</ion-footer-bar>'
    }
})
