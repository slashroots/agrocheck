// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']).config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position('top');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'main',
      sticky: true
    })
    .state('farmerNameSearch', {
      url: '/farmerNameSearch',
      templateUrl: 'templates/search-by-name.html',
      controller: 'main'
    })
    .state('farmerIDSearch', {
      url: '/farmerIDSearch',
      templateUrl: 'templates/search-by-id.html',
      controller: 'main'
    })
    .state('receiptSearch', {
      url: '/receiptSearch',
      templateUrl: 'templates/receipt-search.html',
      controller: 'main'
    })
    .state('farmerProfile', {
      url: '/farmerProfile',
      templateUrl: 'templates/farmer-profile.html',
      controller: 'main',
      abstract:true
    })
    .state('farmerCrops', {
      url: '/farmerCrops',
      templateUrl: 'templates/farmer-crops.html',
      controller: 'main'
    })
    .state('farmerLivestock', {
      url: '/farmerLivestock',
      templateUrl: 'templates/farmer-livestock.html',
      controller: 'main'
    })
    .state('searchResults', {
      url: "/searchResults",
      templateUrl: "templates/search-results.html",
      controller: "main"
    })
    .state('farmList', {
      url: "/farmList",
      templateUrl: "templates/farm-list.html",
      controller: "main"
    })
    .state('receiptList', {
      url: "/receiptList",
      templateUrl: "templates/receipt-list.html",
      controller: "main"
    })
    .state('farmerProfile.personal', {
      url: '/personal',
      views: {
        'farmerProfile-personal': {
          templateUrl: 'templates/farmer-personal-tab.html',
          controller: 'main'
        }
      }
    })
    .state('farmerProfile.agricultural', {
      url: '/agricultural',
      views: {
        'farmerProfile-agricultural': {
          templateUrl: 'templates/farmer-agricultural-tab.html',
          controller: 'main'
        }
      }
    })
    .state('farmProfile', {
      url: '/farmProfile',
      templateUrl: 'templates/farm-profile.html',
      controller: 'main',
      abstract:true
    })
    .state('farmProfile.crops', {
      url: '/crops',
      views: {
        'farmProfile-crops': {
          templateUrl: 'templates/farm-crop-tab.html',
          controller: 'main'
        }
      }
    })
    .state('farmProfile.livestock', {
      url: '/livestock',
      views: {
        'farmProfile-livestock': {
          templateUrl: 'templates/farm-livestock-tab.html',
          controller: 'main'
        }
      }
    });
  $urlRouterProvider.otherwise('/home');
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
