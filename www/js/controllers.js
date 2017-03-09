/**
 * Created by Nick on 11/01/17.
 */

app.controller('main', function ($rootScope, $http, $sce, $location, $state, $ionicPopup) {

  $rootScope.screen='home';

  $rootScope.farmers = {};

  $rootScope.showTopBar = true;

  $rootScope.goBack = function () {
    //$ionicHistory.goBack();
    window.history.back();
  }

  $rootScope.searchResultsText = function () {
    console.log("searchType : " + $rootScope.searchTypeFlag);
    if ($rootScope.searchTypeFlag == 'farmerNameSearch') return "Name or Alias";
    else if ($rootScope.searchTypeFlag == 'farmerIDSearch') return "ID";
    else if ($rootScope.searchTypeFlag == 'receiptSearch') return "Receipt Number";
  }

  $rootScope.showFarmerNumbers = function() {
    //$scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<p ng-if="results[farmerIndex].Farmer_Personal_Info.Res_Tele_Num != \'\' && results[farmerIndex].Farmer_Personal_Info.Res_Tele_Num != null" style="border-style:solid;border-width:1px;border-color:#DCDEE2;border-radius:4px;margin-bottom:5px;" class="margin-bottom padding-right padding-left padding-top padding-bottom">Residential<br> <a ng-href="tel:{{ results[farmerIndex].Farmer_Personal_Info.Res_Tele_Num }}">{{ results[farmerIndex].Farmer_Personal_Info.Res_Tele_Num }}</a><span style="float:right;font-size: 24px;"></span> </p> <p ng-if="results[farmerIndex].Farmer_Personal_Info.Bus_Tele_Num != \'\' && results[farmerIndex].Farmer_Personal_Info.Bus_Tele_Num != null" style="border-style:solid;border-width:1px;border-color:#DCDEE2;border-radius:4px;margin-bottom:5px;" class="margin-bottom padding-right padding-left padding-top padding-bottom">Business <br><a ng-href="tel:{{ results[farmerIndex].Farmer_Personal_Info.Bus_Tele_Num }}">{{ results[farmerIndex].Farmer_Personal_Info.Bus_Tele_Num }}</a> </p> <p ng-if="results[farmerIndex].Farmer_Personal_Info.Cell_Num != \'\' && results[farmerIndex].Farmer_Personal_Info.Cell_Num != null" style="border-style:solid;border-width:1px;border-color:#DCDEE2;border-radius:4px;margin-bottom:5px;" class="margin-bottom padding-right padding-left padding-top padding-bottom">Cell <br><a ng-href="tel:{{ results[farmerIndex].Farmer_Personal_Info.Cell_Num }}">{{ results[farmerIndex].Farmer_Personal_Info.Cell_Num }}</a></p>',
      title: '<b>Choose a number to call</b>',
      subTitle: '',
      scope: $rootScope,
      buttons: [
        { text: 'Cancel' }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $rootScope.showSupportNumbers = function() {
    //$scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<p style="border-style:solid;border-width:1px;border-color:#DCDEE2;border-radius:4px;margin-bottom:5px;" class="margin-bottom padding-right padding-left padding-top padding-bottom">RADA<br> <a ng-href="tel:9771158">9771158</a><span style="float:right;font-size: 24px;"></span> </p> <p style="border-style:solid;border-width:1px;border-color:#DCDEE2;border-radius:4px;margin-bottom:5px;" class="margin-bottom padding-right padding-left padding-top padding-bottom">JAS<br> <a ng-href="tel:9220610">9220610</a><span style="float:right;font-size: 24px;"></span> </p>',
      title: '<b>Choose a number to call</b>',
      subTitle: '',
      scope: $rootScope,
      buttons: [
        { text: 'Cancel' },
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  $rootScope.searchBox = function (searchBy) {
    $rootScope.searchTypeFlag = searchBy;
    $rootScope.searchText = '';
    $state.go(searchBy);
  }

  $rootScope.search = function (searchText) {
    $rootScope.searchType = "byFarmer";
    $rootScope.results = "";
    $rootScope.noResults = false;
    $rootScope.searchText = searchText;
    $location.path( '/searchResults' );
    $rootScope.getObjects('farmers/search?searchQuery=' + searchText + "&")
  };

  $rootScope.searchByReceipt = function (searchText) {
    $rootScope.searchType = "byReceipt";
    $rootScope.results = "";
    $rootScope.noResults = false;
    $rootScope.searchText = searchText;
    $location.path( '/searchResults' );
    $rootScope.getReceipts('receipt/' + searchText + "?")
  };

  $rootScope.getFarmerProfile = function (index) {

    $rootScope.farmerIndex = index;

    $location.path( '/farmerProfile/personal' );
  }

  $rootScope.propertiesScreen = function () {
    $location.path( '/farmList' );
  }

  $rootScope.receiptsScreen = function () {
    $location.path( '/receiptList' );
  }

  $rootScope.propertyScreen = function (index) {
    $rootScope.farmIndex = index;
    $location.path( '/farmProfile/crops' );
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
      if ($rootScope.results == '') $rootScope.noResults = true;
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

  $rootScope.getReceipts = function (obj) {
    $rootScope.variable = "";
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-nick.herokuapp.com/api/" + obj + "access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      console.log(response);
      $rootScope.getObjects('farmers/search?searchQuery=' + response.IDX_Stakeholder + "&")
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
  }

  $rootScope.parseDate = function (date) {
    newDate = new Date(Date.parse(date));
    ret = newDate.toDateString();
    dateArray = ret.split(" ");
    parsedDate = dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
    return parsedDate;
  }
});
