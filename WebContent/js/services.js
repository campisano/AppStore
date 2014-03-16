// AppStoreServices module
var appStoreServices = angular.module("AppStoreServices", [
    "ngResource"
]);



// from http://www.thinkster.io/angularjs/9jfpSmbx1j/angularjs-sharing-data-between-controllers'
// AppStore application context
appStoreServices.factory("SessionService", [
    function()
    {
        function SessionObject()
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
                //TODO
                /*
                if(! (product instanceof ProductModel))
                {
                    throw new Error("SessionObject.getImagePathFromProduct() parameter must be a ProductModel");
                }
                */
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
                //TODO
                /*
                if(! (product instanceof ProductModel))
                {
                    throw new Error("SessionObject.getReferenceURLFromProduct() parameter must be a ProductModel");
                }
                */
                var url = "";

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

        return new SessionObject();
    }
]);



// ProductService
appStoreServices.factory("ProductService", [
    "$resource",
    "$http",
    function($resource, $http)
    {
        function ProductServiceObject()
        {
            var self = this;

            self.getProductList = function(fn_success, fn_error)
            {
                self.getProductDetail(fn_success, fn_error, "products");
            };

            self.getProductDetail = function(fn_success, fn_error, product_id)
            {
                $http({
                    method: "GET",
                    url: "data/" + product_id + ".json",
                    cache: false,
                    responseType: "json",
                    isArray: true
                }).
                success(fn_success).
                error(fn_error);
            };
        }

        return new ProductServiceObject();
    }
]);



// AccountService
appStoreServices.factory("AccountService", [
    "$resource",
    "$http",
    function($resource, $http)
    {
        return $resource("data/:user_id.json", {},
        {
            get: {
                method: "GET",
                params: { user_id: "products" }, // TODO remove
                cache: false,
                responseType: "json",
                isArray: true //TODO rempove
            }
        });
    }
]);



// CartService
appStoreServices.factory("CartService", [
     "$resource",
     "$http",
     function($resource, $http)
     {
         return $resource("data/:user_id.json", {},
         {
             get: {
                 method: "GET",
                 params: { user_id: "products" }, // TODO remove
                 cache: false,
                 responseType: "json",
                 isArray: true //TODO rempove
             }
         });
    }
]);
