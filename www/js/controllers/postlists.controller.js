/* global app */
'use strict';
app
// Post List 
  .controller('PostlistsCtrl', [
  '$scope',
  '$ionicScrollDelegate', 
  'dataservice',
  function(
  $scope,
  $ionicScrollDelegate, 
  dataservice
  ) {
  $scope.morePosts = true;
  $scope.listview = true;
  $scope.postlists = [];
  $scope.templatePostList = true;
  var pages = 1;
  $scope.loadMore = function() {
    dataservice.posts(pages).then(function(d) {
      if (pages <= d.pages) {
        $scope.postlists.push.apply($scope.postlists, d.posts);
        pages++;
      }
      if (pages > d.pages) {
        $scope.morePosts = false;
      }
    }).catch(function() {
      $scope.morePosts = false;
    }).finally(function() {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  $scope.postView = function() {
    $scope.postViewType = ($scope.postViewType) ? false : true;
    return $scope.postViewType;
  };
  $scope.test = function(thumb) {
    var bg = (thumb) ? thumb : 'img/no-image.png';
    return {
      'background-image': 'url("' + bg + '")'
    };
  };

}]);