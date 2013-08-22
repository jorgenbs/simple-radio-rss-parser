'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/rss'}).
  success(function(data, status, headers, config) {
    $scope.items = data;
  }).
  error(function(data, status, headers, config) {
    $scope.items = [];
  });
}