app.controller('walkthrough', ['$ionicSideMenuDelegate', '$scope', '$ionicSlideBoxDelegate', '$state',
 function($ionicSideMenuDelegate, $scope, $ionicSlideBoxDelegate, $state){

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.slideDetails = [{
    title: '<b>Cprofile</b> walk through',
    buttonText: 'Next',
    image: 'img/screen/screen-1.png'
  },
  {
    title: 'Post List',
    buttonText: 'Next',
    image: 'img/screen/screen-2.png'
  },
  {
    title: 'Post Details',
    buttonText: 'Next',
    image: 'img/screen/screen-3.png'
  },
  {
    title: 'Page template',
    buttonText: 'Go to App',
    image: 'img/screen/screen-4.png'
  }];

  $scope.slide = {
    current: 0,
    total: $scope.slideDetails.length,
    pagerClick: function (index) {
      $ionicSlideBoxDelegate.slide(index, 250);
    },
    slideChanged: function (index){
      $scope.slide.current = index;
    }
  };

  $scope.wkButton = function () {
    var lastslide = $scope.slide.total - 1;
    if ($scope.slide.current === lastslide) {
      localStorage.setItem('appFirstRun', 'true');
      $state.go('app.postlist');
    }else {
      $ionicSlideBoxDelegate.next();
    }
  };

	// button events
	$scope.$on('$ionicView.enter', function(){
	  $scope.slide.current = 0;
	});
}]);
