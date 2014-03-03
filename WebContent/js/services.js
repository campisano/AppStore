// phonecatServices module
var phonecatServices = angular.module('phonecatServices', [
                                        // dependencies
                                        'ngResource'
                                        ]);

// PhoneService service
phonecatServices.factory('PhoneService', [
                            // dependencies
                            '$resource',
                            '$http',
                            function($resource, $http)
                            {
                                /*
                                this.getPhoneDetail = new function(phoneId)
                                {
                                    $http({
                                        method: 'GET',
                                        url: 'phones/' + phoneId + '.json',
                                        cache: false,
                                        responseType: 'json'
                                    }).
                                    success(function(data, status, headers, config) {
                                        // this callback will be called asynchronously
                                        // when the response is available
                                    }).
                                    error(function(data, status, headers, config) {
                                        // called asynchronously if an error occurs
                                        // or server returns response with an error status.
                                    });
                                };
                                */

                                // Example:
                                // PhoneService.query({'name':'fooBar'},{'Id':1});
                                // Result URL: phones/1.json?name=fooBar
                                return $resource('phones/:phoneId.json', {},
                                {
                                    query: {
                                        method: 'GET',
                                        params: { phoneId: 'phones' },
                                        cache: false,
                                        responseType: 'json',
                                        isArray: true
                                    },
                                    get: {
                                        method: 'GET',
                                        cache: false,
                                        responseType: 'json'
                                    }
                                });
                            }]);
