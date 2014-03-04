// phoneControllers module
var phonecatControllers = angular.module('phonecatControllers', []);

//HeaderController controller
phonecatControllers.controller('HeaderController',
        [ // dependencies
         '$scope', // view DOM scope
         '$location',
         'DataSharingService',
         function HeaderController($scope, $location, DataSharingService) 
         { 
        	 $scope.shared_data = DataSharingService;
        	 
             $scope.isActive = function (viewLocation) { 
                 return viewLocation === $location.path();
             };
         }]);

// PhoneListCtrl controller
phonecatControllers.controller('PhoneListCtrl', [
                                // dependencies
                                '$scope', // view DOM scope
                                'PhoneService',
                                'DataSharingService',
                                function ($scope, PhoneService, DataSharingService)
                                {
                                    $scope.shared_data = DataSharingService;
                                    
                                    $scope.shared_data.phones = PhoneService.query();
                                    $scope.shared_data.orderProp = 'age';
                                }]);

// PhoneDetailCtrl controller
phonecatControllers.controller('PhoneDetailCtrl', [
                                // dependencies
                                '$scope', // view DOM scope
                                '$routeParams',
                                '$http',
                                'PhoneService',
                                function($scope, $routeParams, $http, PhoneService)
                                {
                                    $scope.phone = PhoneService.get( {phoneId: $routeParams.phoneId}, function(phone)
                                    {
                                        $scope.mainImageUrl = phone.images[0];
                                    });

                                    //$scope.phone = PhoneService.getPhoneDetail($routeParams.phoneId);
                                    //$scope.mainImageUrl = $scope.phone.images[0];

                                    // define a new function on scope
                                    $scope.setImage = function(imageUrl)
                                    {
                                        $scope.mainImageUrl = imageUrl;
                                    };
                                }]);
