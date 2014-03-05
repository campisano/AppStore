// AppStoreServices module
var appStoreServices = angular.module("AppStoreServices", [
    "ngResource"
]);



// from http://www.thinkster.io/angularjs/9jfpSmbx1j/angularjs-sharing-data-between-controllers'
// AppStore application context
appStoreServices.factory("DataSharingService", [
    function()
    {
        function DataSharingModel ()
        {
            var self = this;
            self.windows_system = "Windows Phone";
            self.google_system = "Android";

            self.windows_ref_url = "http://www.windowsphone.com/en-us/store/app/";
            self.google_ref_url = "https://play.google.com/store/apps/details?id=";

            self.products_image_path = "img/products/";
            self.windows_image_path = "windows_store/";
            self.google_image_path = "google_play/";
            self.unknown_image_name = "unknown";
            self.image_ext = ".png";

            self.getImagePathFromProduct = function(product)
            {
                var image_dir = self.products_image_path;

                if(product.system.substring(0, self.windows_system.length) == self.windows_system)
                {
                    image_dir += self.windows_image_path + product.id.substring(product.id.indexOf('/') + 1) + self.image_ext;
                }
                else if (product.system.substring(0, self.google_system.length) == self.google_system)
                {
                    image_dir += self.google_image_path + product.id + self.image_ext;
                }
                else
                {
                    image_dir += self.unknown_image_name + self.image_ext;
                }

                return image_dir;
            };

            self.getReferenceURLFromProduct = function(product)
            {
                var url = "#";

                if(product.system.substring(0, self.windows_system.length) == self.windows_system)
                {
                    url = self.windows_ref_url + product.id;
                }
                else if (product.system.substring(0, self.google_system.length) == self.google_system)
                {
                    url = self.google_ref_url + product.id;
                }

                return url;
            };
        }

        return new DataSharingModel();
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
