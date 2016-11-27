/* global app */
'use strict';
app
// Post Details
  .controller('PageCtrl', [
  '$scope',
  '$stateParams',
  '$sce', 
  '$ionicModal',
  '$timeout', 
  'dataservice',
  '$ionicLoading',
  function(
  $scope, 
  $stateParams, 
  $sce, 
  $ionicModal, 
  $timeout, 
  dataservice, 
  $ionicLoading
  ) {
  var pageId = $stateParams.pageId;
  dataservice.pageDetails(pageId).then(function(d) {
    $scope.page = d.page;
    $scope.content = $sce.trustAsHtml($scope.page.content);
    $ionicLoading.hide();
  });
  $ionicLoading.show({
    noBackdrop: true,
    template: '<p class="text-center"><ion-spinner icon="ios"></ion-spinner></p>'
  });
}]);