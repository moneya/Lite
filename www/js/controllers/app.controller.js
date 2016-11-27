/* global app */
'use strict';
app.controller('AppCtrl', 
 ['$rootScope',
 '$cordovaNetwork',
 '$scope',
 '$ionicPopup',
 '$ionicModal',
 '$timeout',
 '$ionicScrollDelegate',
 'dataservice',
 '$state',
 'appConfig',
 function($rootScope, 
 $cordovaNetwork, 
 $scope, 
 $ionicPopup, 
 $ionicModal, 
 $timeout, 
 $ionicScrollDelegate, 
 dataservice, 
 $state, 
 appConfig) {
  document.addEventListener('deviceready', function() {
    var networkStatus = '';
    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
        networkStatus = networkState;
      });
      // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
      networkStatus = networkState;
      $scope.showAlert();
    });
  }, false);
  $scope.showAlert = function() {
     $ionicPopup.alert({
      title: 'Error!',
      template: 'Please check your internet connection or try again later'
    });
  };
  $scope.catfilterData = {};
  $ionicModal.fromTemplateUrl('templates/postCatFilter.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCatFilter = modal;
  });
  $scope.postFilterCat = function() {
    $scope.modalCatFilter.show();
    dataservice.categoryIndex().then(function(d) {
      $scope.catlist = d.categories;
    });
  };
  $scope.closePostFilterCat = function() {
    $scope.modalCatFilter.hide();
  };
  $scope.doPostFilter = function() {
    $scope.fiterId = Object.keys($scope.catfilterData);
    $scope.fiterId = $scope.fiterId.toString();
    $state.go('app.categories', {
      catslug: $scope.fiterId
    });
    $timeout(function() {
      $scope.catfilterData = {};
      $scope.closePostFilterCat();
    }, 1000);
  };
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop({
      shouldAnimate: true
    });
  };
  $scope.data = {
    gotoTopButton: false
  };
  var timeout = 0;
  $scope.getScrollPosition = function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      $scope.moveData = $ionicScrollDelegate.getScrollPosition().top;
      $scope.data.gotoTopButton = ($scope.moveData >= 250) ? true : false;
      $scope.$digest();
    }, 100);
  };
  $scope.sidebarMenu = appConfig.sidebarMenu;
}]);