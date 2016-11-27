/* global app */
'use strict';
var app = angular.module('ionicWordpress', [
 'ionic',
 'ngSanitize',
 'com.2fdevs.videogular',
 'com.2fdevs.videogular.plugins.controls',
 'com.2fdevs.videogular.plugins.overlayplay',
 'com.2fdevs.videogular.plugins.poster',
 'ngCordova',
 'angularMoment',
 'ngNotify',
 'ngAnimate']).run(function($ionicPlatform, $state, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();

    } 


  });


  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if($state.current.name == "app.postlist") { // your check here
      $ionicPopup.confirm({
        title: 'Exit?',
        template: 'Are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);

})
  

// VIEWS AND THEIR CONTROLLERS
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app',
   {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.postlist', {
    url: '/postlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/postlist.html',
        controller: 'PostlistsCtrl'
      }
    }
  }).state('app.categories', {
    url: '/categories/:catslug',
    views: {
      'menuContent': {
        templateUrl: 'templates/postlist.html',
        controller: 'CategoriesCtrl'
      }
    }
  }).state('app.author', {
    url: '/author/:authorId',
    views: {
      'menuContent': {
        templateUrl: 'templates/postlist.html',
        controller: 'AuthorCtrl'
      }
    }
  }).state('app.postdetails', {
    url: '/postdetails/:postid',
    views: {
      'menuContent': {
        templateUrl: 'templates/postdetails.html',
        controller: 'PostDetailsCtrl'
      }
    }
  }).state('app.pageDetails', {
    url: '/page/:pageId',
    views: {
      'menuContent': {
        templateUrl: 'templates/pageDetails.html',
        controller: 'PageCtrl'
      }
    }
  }).state('app.walkthrough', {
    url: '/walkthrough',
    views: {
      'menuContent': {
        templateUrl: 'templates/walkthrough.html',
        controller : 'walkthrough'
      }
    }
  }).state('app.admob', {
    url: '/admob',
    views: {
      'menuContent': {
        templateUrl: 'templates/admob.html',
        controller : 'AdCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  var appFirstRun = localStorage.getItem('appFirstRun');

  if(appFirstRun && appFirstRun === 'true'){
    $urlRouterProvider.otherwise('/app/postlist');
  }else{
    $urlRouterProvider.otherwise('/app/walkthrough');
  }
});
