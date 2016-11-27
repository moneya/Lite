app
  .factory('adMob', function($window, appConfig) {
    var admob = $window.AdMob;

    if (admob) {
      // Register AdMob events
      // new events, with variable to differentiate: adNetwork, adType, adEvent
      document.addEventListener('onAdFailLoad', function(data) {
        console.log('error: ' + data.error +
          ', reason: ' + data.reason +
          ', adNetwork:' + data.adNetwork +
          ', adType:' + data.adType +
          ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
      });
      document.addEventListener('onAdLoaded', function(data) {
        console.log('onAdLoaded: ' + data);
      });
      document.addEventListener('onAdPresent', function(data) {
        console.log('onAdPresent: ' + data);
      });
      document.addEventListener('onAdLeaveApp', function(data) {
        console.log('onAdLeaveApp: ' + data);
      });
      document.addEventListener('onAdDismiss', function(data) {
        console.log('onAdDismiss: ' + data);
      });

      var defaultOptions = {
        // bannerId: admobid.banner,
        // interstitialId: admobid.interstitial,
        // adSize: 'SMART_BANNER',
        // width: integer, // valid when set adSize 'CUSTOM'
        // height: integer, // valid when set adSize 'CUSTOM'
        position: admob.AD_POSITION.BOTTOM_CENTER,
        // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
        bgColor: 'black', // color name, or '#RRGGBB'
        // x: integer,		// valid when set position to 0 / POS_XY
        // y: integer,		// valid when set position to 0 / POS_XY
        isTesting: true, // set to true, to receiving test ad for testing purpose
        // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
      };

      var platform;
      if (ionic.Platform.isAndroid()) {
        platform = 'android';
      } else if (ionic.Platform.isIOS()) {
        platform = 'ios';
      }
      else { //Not checking any other browser. In case you are supporting more platforms, you can read about Ionic Platforms at: http://ionicframework.com/docs/api/utility/ionic.Platform/
        platform = 'browser';
      }
      var admobid = appConfig.admob[platform];

      admob.setOptions(defaultOptions);

      // Prepare the ad before showing it
      admob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: false,
        success: function() {
          console.log('interstitial prepared');
        },
        error: function() {
          console.log('failed to prepare interstitial');
        }
      });
    } else {
      console.log("No AdMob?");
    }

    return {
      showBanner: function() {
        if (admob) {
          admob.createBanner({
            adId: admobid.banner,
            position: admob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true,
            success: function() {
              console.log('banner created');
            },
            error: function() {
              console.log('failed to create banner');
            }
          });
        }
      },
      showInterstitial: function() {
        if (admob) {
          // If you didn't prepare it before, you can show it like this
          // admob.prepareInterstitial({adId:admobid.interstitial, autoShow:autoshow});

          // If you did prepare it before, then show it like this
          // 		- (for example: check and show it at end of a game level)
          admob.showInterstitial();
        }
      },
      removeAds: function() {
        if (admob) {
          admob.removeBanner();
        }
      }
    };
  });
