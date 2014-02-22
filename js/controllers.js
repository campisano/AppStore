var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http', 'PhoneService',
                               function ($scope, $http, PhoneService)
{
    $scope.phones = PhoneService.query();
    $scope.orderProp = 'age';
}]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http', 'PhoneService',
                               function($scope, $routeParams, $http, PhoneService)
{
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data)
    {
        $scope.phone = PhoneService.get( {phoneId: $routeParams.phoneId}, function(phone)
        {
            $scope.mainImageUrl = phone.images[0];
        });

        $scope.setImage = function(imageUrl)
        {
            $scope.mainImageUrl = imageUrl;
        }
    });
}]);
