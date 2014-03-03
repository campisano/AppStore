// phoneControllers module
var phonecatControllers = angular.module('phonecatControllers', []);

// PhoneListCtrl controller
phonecatControllers.controller('PhoneListCtrl', [
                                // dependencies
                                '$scope', // view DOM scope
                                'PhoneService',
                                function ($scope, PhoneService)
                                {
                                   $scope.phones = PhoneService.query();
                                   $scope.orderProp = 'age';
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
