/* global app */
'use strict';
app.service('dataservice', [
 '$http',
 '$q',
 'appConfig',
 'ngNotify',
 function(
 $http, 
 $q, 
 appConfig, 
 ngNotify) {
  // Post List
  function _posts(page) {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=1&page=' + page;
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      serviceMessage(appConfig.message);
      dfd.reject(data);
    });
    return dfd.promise;
  }
  // Post Categories List
  function _postsCategories(page, id) {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=get_category_posts&id=' + id + '&page=' + page;
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      dfd.reject(data);
    });
    return dfd.promise;
  }
  // Author Categories List
  function _authorCategories(page, id) {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=get_author_posts&id=' + id + '&page=' + page;
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      dfd.reject(data);
    });
    return dfd.promise;
  }
  // Post Details
  function _postDetails(ID) {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=get_post&post_id=' + ID;
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      dfd.reject(data);
    });
    return dfd.promise;
  }
  // Category Index
  function _categoryIndex() {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=get_category_index';
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      dfd.reject(data);
    });
    return dfd.promise;
  }
  // Page Details
  function _pageDetails(ID) {
    var dfd = $q.defer();
    var url = appConfig.apiEndPoint + '=1&page_id=' + ID;
    $http.get(url).success(function(data) {
      dfd.resolve(data);
    }).error(function(data) {
      dfd.reject(data);
    });
    return dfd.promise;
  }

  function serviceMessage(d) {
    var m = (d) ? d.message : appConfig.dataServiceError;
    ngNotify.set(m, 'error');
  }
  return {
    posts: _posts,
    postDetails: _postDetails,
    postsCategories: _postsCategories,
    categoryIndex: _categoryIndex,
    pageDetails: _pageDetails,
    authorCategories: _authorCategories
  };
}]);