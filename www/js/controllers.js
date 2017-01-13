/**
 * Created by Nick on 11/01/17.
 */

app.controller('main', function ($scope, $http, $sce) { //store the entities name in a variable var taskData = 'task';

  $scope.getFarmers = function () {
    var access_token = "0f37f942ef033e104191515dcaeb2739aeea3773710431d61e04e5c3a88e4b120a54482da707aac7eb77d5fb08877a928905121d8e1d80facfa0bcb8c085d135";
    var url = "http://harvest-api-production.herokuapp.com/api/farmers?access_token=" + access_token;
    //alert(url);
    $sce.trustAsResourceUrl(url);
    $http.get(url).success(function(response){
      $scope.variable = JSON.stringify(response);
      //alert(response.data);
    })
      .error(function(data, status, headers,config){
        console.log(status);
        console.log(headers());
        console.log(config);
        alert('data error');
      });
    //alert("Farmers Retrieved!");
    //getFarmers
  }
})
