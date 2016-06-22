angular.module('starter.controllers', []).factory('AppCtrl', ['$http'])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    var request = {
        method: 'POST',
        url: 'https://ids.embraer.com.br/nidp/idff/sso?sid=0&sid=0',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        data: 'Ecom_User_ID=' + $scope.loginData.username + '&Ecom_Password=' + $scope.loginData.password
    };

    return $http(request).then(function(response){
        console.log(response.data);
        $scope.closeLogin();
    });
  };

  $scope.requestCardapio = function() {
    console.log('Getting cardapio');

    var request = {
        method: 'POST',
        url: 'https://csi.embraer.com.br/Servicos/ServicosGerais/_vti_bin/Lists.asmx',
        headers: {
            'Content-Type': 'text/xml',
            'SOAPAction': 'http://schemas.microsoft.com/sharepoint/soap/GetListItems'
        },
        withCredentials: true,
        data: "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>\
          <soap:Body>\
            <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>\
              <listName>T_CARDAPIO_NEW</listName>\
              <viewName/>\
              <query>\
                <Query>\
                  <ViewFields>\
                    <FieldRef Name='CARDAPIO_PRATO' />\
                    <FieldRef Name='CARDAPIO_PRATO_x003a_DSC_PRATO' />\
                    <FieldRef Name='CARDAPIO_PRATO_x003a_DSC_UNID' />\
                    <FieldRef Name='CARDAPIO_PRATO_x003a_KCAL' />\
                    <FieldRef Name='CARDAPIO_TIPO' />\
                    <FieldRef Name='CARDAPIO_TIPO_x003a_ORDEM' />\
                  </ViewFields>\
                  <Where>\
                    <And>\
                      <Eq>\
                        <FieldRef Name='SITE' />\
                        <Value Type='Lookup'>SJK</Value>\
                      </Eq>\
                      <Eq>\
                        <FieldRef Name='DATA' />\
                        <Value IncludeTimeValue='FALSE' Type='DateTime'>2016-06-23</Value>\
                      </Eq>\
                    </And>\
                  </Where>\
                  <OrderBy>\
                    <FieldRef Name='CARDAPIO_TIPO_x003a_ORDEM' Ascending='True' />\
                  </OrderBy>\
                </Query>\
              </query>\
              <viewFields/>\
              <rowLimit>999</rowLimit>\
              <queryOptions>\
                <QueryOptions/>\
              </queryOptions>\
            </GetListItems>\
          </soap:Body>\
        </soap:Envelope>"
    };

    console.log(request);

    return $http(request).then(function(response){
        console.log(response.data);
    });
  };

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
    //  $scope.closeLogin();
    //}, 1000);
})

.controller('PlaylistsCtrl', function($scope, $http) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
