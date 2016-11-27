/* global app */
'use strict';
app
// Post Details
  .controller('PostDetailsCtrl', [
 '$scope',
 '$stateParams',
 '$sce',
 '$cordovaSocialSharing',
 'dataservice',
 '$ionicLoading',
 '$state',
 function($scope, 
 $stateParams, 
 $sce, 
 $cordovaSocialSharing,
 dataservice, 
 $ionicLoading, 
 $state
 ) {

   
    // load Data
    dataservice.postDetails($stateParams.postid).then(function(d) {
      $scope.postDetails = d.post;
      $scope.content = $sce.trustAsHtml($scope.postDetails.content);      
      if (typeof d.post.custom_fields.postVideoyoutube_video_id !='undefined') {
        $scope.videoURL = $sce.trustAsResourceUrl($scope.postDetails.custom_fields.postVideoyoutube_video_id[0]);
      }      
      var audioUrl = '';
      if (d.post.custom_fields.hasOwnProperty('postAudioaudioUrl')) {
        audioUrl = d.post.custom_fields.postAudioaudioUrl[0];
      }
      $scope.audio = {
        sources: [{
          src: $sce.trustAsResourceUrl(audioUrl),
          type: "audio/mpeg"
        }]
      };
      $scope.next_url = d.next_url;
      $scope.previous_url = d.previous_url;
      $ionicLoading.hide();
      $scope.shareUrl = d.post.url;
    });
    $scope.loading = function() {
      $ionicLoading.show({
        template: '<p class="text-center"><ion-spinner icon="ios"></ion-spinner></p>'
      });
    };
    $scope.shareloading = function() {
      $ionicLoading.show({
        template: '<p class="text-center"><ion-spinner icon="ios"></ion-spinner></p>',
        duration:'5000'
      });
    };
    $scope.loading();
    $scope.sharePost = function() {
      $scope.showShare = !$scope.showShare;
    };
    $scope.hidesharePost = function() {
      $scope.showShare = false;
    };
    $scope.shareViaWhatsApp = function() {
      $scope.shareloading();
      $cordovaSocialSharing.shareViaWhatsApp($scope.postDetails.title, null, $scope.postDetails.url);
    };
    $scope.shareViaAll = function() {
      $scope.shareloading();
      $cordovaSocialSharing.share($scope.postDetails.title, $scope.postDetails.url);
    };
    $scope.onDragLeft = function() {
      if ($scope.next_url) {
        $state.go('app.postdetails', {
          postid: $scope.next_url
        });
      }
    };
    $scope.onDragRight = function() {
      if ($scope.previous_url) {
        $state.go('app.postdetails', {
          postid: $scope.previous_url
        });
      }
    };
    $scope.share = function(service) {
    var sharer = '';
    switch (service) {
    case 'fb':
      sharer = 'https://www.facebook.com/sharer/sharer.php?u=' + $scope.shareUrl;
      break;
    case 'tw':
      sharer = 'https://twitter.com/home?status=' + $scope.shareUrl;
      break;
    case 'gp':
      sharer = 'https://plus.google.com/share?url=' + $scope.shareUrl;
      break;
    case 'pt':
      sharer = 'https://pinterest.com/pin/create/button/?url=' + $scope.shareUrl + '&media=' + $scope.postDetails.thumbnail + '&description=' + $scope.postDetails.title;
      break;
    }
    window.open(encodeURI(sharer), '_system');
    };
}]);