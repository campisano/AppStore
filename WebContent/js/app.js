// app module
var phonecatApp = angular.module('phonecatApp',
                                    // dependencies
                                    ['ngRoute',
                                     'phonecatControllers',
                                     'phonecatFilters',
                                     'phonecatServices',
                                     'phonecatAnimations']);

// app url routes to templates
phonecatApp.config(['$routeProvider',
                    function($routeProvider)
                    {
                        $routeProvider.
                            when('/phones',
                            {
                                templateUrl: 'partials/phone-list.html',
                                controller: 'PhoneListCtrl'
                            }).
                            when('/phones/:phoneId',
                            {
                                templateUrl: 'partials/phone-detail.html',
                                controller: 'PhoneDetailCtrl'
                            }).
                            otherwise(
                            {
                                redirectTo: '/phones'
                            });
                    }]);
