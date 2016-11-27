/* global app */
'use strict';
app.constant('appConfig', {
  apiEndPoint: 'https://www.techcorb.com/?json',
  // apiEndPoint: 'http://ec2-52-21-107-249.compute-1.amazonaws.com/thoughtsnshare/?json',
  sidebarMenu: [{
    id: 1707,
    title: 'Contact'
  }, {
    id: 1804, 
    title: 'About US'
  }, {  
    id: 1808,    
    title: 'Service'
  }
  ],
  admob: {
    android: {
      banner: 'ca-app-pub-1605099908936240/4396968417',
      interstitial: 'ca-app-pub-1605099908936240/5873701618'
    },
    ios: {
      banner: 'ca-app-pub-1605099908936240/8827168010',
      interstitial: 'ca-app-pub-1605099908936240/1303901216'
    },
    browser: {
      banner: 'ca-app-pub-1605099908936240/4257367612',
      interstitial: 'ca-app-pub-1605099908936240/5734100814'
    }
  },
  dataServiceError: 'Something error happened'
});