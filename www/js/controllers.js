/**
 * Created by Nick on 11/01/17.
 */

app.controller('main', function ($rootScope, $http, $sce, $location) {

  $rootScope.screen='home';

  $rootScope.farmers = {};

  $rootScope.showTopBar = true;

  $rootScope.search = function (searchText) {
    $rootScope.searchText = searchText;
    $location.path( '/searchResults' );
    $rootScope.getObjects('farmers/search?searchQuery=' + searchText + "&")
  };

  $rootScope.getFarmerProfile = function (index) {

    $rootScope.farmerIndex = index;

    $location.path( '/farmerProfile/personal' );
  }

  $rootScope.screenTitle = function (screen) {
    if (screen=='home') return "Farmer Search";
    else if (screen=='search-by-farmer') return "Search By Farmer I.D.";
  }

  $rootScope.setFarmer = function (result) {
    console.log(result);
    $rootScope.getProperties('properties?IDX_Stakeholder=' + result.IDX_Stakeholder + "&");
    $rootScope.getCrops('crops?IDX_Stakeholder=' + result.IDX_Stakeholder + "&");
    $rootScope.getLivestock('livestock?IDX_Stakeholder=' + result.IDX_Stakeholder + "&");

    $rootScope.farmer = result;
    return 'farmer-profile';
  }

  $rootScope.getProperties = function (obj) {
    $rootScope.variable = "";
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-nick.herokuapp.com/api/" + obj + "access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      console.log(response);
      $rootScope.properties = response;
      //$rootScope.results = JSON.stringify(response);
      //alert(response.data);
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
  }

  $rootScope.getCrops = function (obj) {
    $rootScope.variable = "";
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-nick.herokuapp.com/api/" + obj + "access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      console.log(response);
      $rootScope.crops = response;
      //$rootScope.results = JSON.stringify(response);
      //alert(response.data);
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
  }

  $rootScope.getLivestock = function (obj) {
    $rootScope.variable = "";
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-nick.herokuapp.com/api/" + obj + "access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      console.log(response);
      $rootScope.livestock = response;
      //$rootScope.results = JSON.stringify(response);
      //alert(response.data);
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
  }

  $rootScope.getObjects = function (obj) {
    $rootScope.variable = "";
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-nick.herokuapp.com/api/" + obj + "access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      console.log(response);
      $rootScope.results = response;
      //$rootScope.results = JSON.stringify(response);
      //alert(response.data);
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
  }
});
