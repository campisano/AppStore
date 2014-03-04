// AppStoreServices module
var appStoreServices = angular.module("AppStoreServices", [
    "ngResource"
]);



// from http://www.thinkster.io/angularjs/9jfpSmbx1j/angularjs-sharing-data-between-controllers'
// AppStore application context
appStoreServices.factory("DataSharingService", [
    function()
    {
        return {};
    }
]);



// ProductRepositoryService service
appStoreServices.factory("ProductRepositoryService", [
    "$resource",
    "$http",
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
        return $resource("data/:product_id.json", {},
        {
            query: {
                method: "GET",
                params: { product_id: "products" },
                cache: false,
                responseType: "json",
                isArray: true
            },
            get: {
                method: "GET",
                cache: false,
                responseType: "json"
            }
        });
    }
]);
