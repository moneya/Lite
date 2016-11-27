/* global app */
'use strict';
app
// Categories List
 .controller('AuthorCtrl',[
 '$scope',
 '$stateParams',
 'dataservice',
 function(
  $scope,
  $stateParams,
  dataservice
  ) {
  $scope.morePosts = true;
  $scope.templateArchive = true;
  $scope.postlists = [];
  var authorId = $stateParams.authorId;
  var pages = 1;
  $scope.loadMore = function() {
    dataservice.authorCategories(pages, authorId).then(function(d) {
      if (pages <= d.pages) {
        $scope.postlists.push.apply($scope.postlists, d.posts);
        pages++;
      }
      if (pages > d.pages) {
        $scope.morePosts = false;
      }
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
      'background-image': 'url("' + bg + ')'
    };
  };

}]);