/* global app */
'use strict';
app.controller('AdCtrl', ['$scope', 'adMob', function($scope, adMob){

  $scope.manageAdMob = {
    showBanner: adMob.showBanner,
    showInterstitial: adMob.showInterstitial,
    remove: adMob.removeAds
	};
	
}]);