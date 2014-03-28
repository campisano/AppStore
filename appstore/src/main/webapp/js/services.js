// AppStoreServices module
var appStoreServices = angular.module("AppStoreServices", []);



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
                if(! (product instanceof ProductModel))
                {
                    throw new Error("SessionObject.getImagePathFromProduct() parameter must be a ProductModel");
                }

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
                if(! (product instanceof ProductModel))
                {
                    throw new Error("SessionObject.getReferenceURLFromProduct() parameter must be a ProductModel");
                }

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
    "$http",
    function($http)
    {
        function ProductServiceObject()
        {
            var self = this;

            self.getProductList = function(fn_success, fn_error)
            {
                $http({
                    method: "GET",
                    url: "rest/product/list",
                    cache: false,
                    responseType: "json",
                    isArray: true
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        var products = new Array();

                        for(var i = 0; i < data.response.length; ++i)
                        {
                            products.push(new ProductModel(
                                data.response[i].id,
                                data.response[i].name,
                                data.response[i].price,
                                data.response[i].version,
                                data.response[i].size,
                                data.response[i].system,
                                data.response[i].type,
                                data.response[i].category,
                                data.response[i].age,
                                data.response[i].description
                            ));
                        }

                        fn_success(products);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };

            self.getProductDetail = function(product_id, fn_success, fn_error)
            {
                $http({
                    method: "GET",
                    url: "rest/product/" + product_id.replace("/", "|"),
                    cache: false,
                    responseType: "json"
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        var product = new ProductModel(
                                data.response.id,
                                data.response.name,
                                data.response.price,
                                data.response.version,
                                data.response.size,
                                data.response.system,
                                data.response.type,
                                data.response.category,
                                data.response.age,
                                data.response.description
                            );

                        fn_success(product);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };
        }

        return new ProductServiceObject();
    }
]);



// AccountService
appStoreServices.factory("AccountService", [
    "$http",
    function($http)
    {
        function AccountServiceObject()
        {
            var self = this;

            self.register = function(username, password, email, fn_success, fn_error)
            {
                $http({
                    method: "POST",
                    data: { username: username, password: password, email: email },
                    url: "rest/account/register",
                    cache: false,
                    responseType: "json"
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        var user = new UserModel(
                            data.response.session_id,
                            data.response.username,
                            data.response.email
                        );

                        fn_success(user);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };

            self.edit = function(session_id, username, password, email, fn_success, fn_error)
            {
                $http({
                    method: "POST",
                    data: { session_id: session_id, username: username, password: password, email: email },
                    url: "rest/account/edit",
                    cache: false,
                    responseType: "json"
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        var user = new UserModel(
                            data.response.session_id,
                            data.response.username,
                            data.response.email
                        );

                        fn_success(user);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };

            self.login = function(username, password, fn_success, fn_error)
            {
                $http({
                    method: "POST",
                    data: { username: username, password: password },
                    url: "rest/account/login",
                    cache: false,
                    responseType: "json"
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        var user = new UserModel(
                            data.response.session_id,
                            data.response.username,
                            data.response.email
                        );

                        fn_success(user);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };

            self.logout = function(session_id, fn_success, fn_error)
            {
                $http({
                    method: "POST",
                    data: { session_id: session_id },
                    url: "rest/account/logout",
                    cache: false,
                    responseType: "json"
                }).
                success(function(data, status, headers, config)
                {
                    if(data.error == null)
                    {
                        fn_success(null);
                    }
                    else
                    {
                        fn_error(data.error);
                    }
                }).
                error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
            };
        }

        return new AccountServiceObject();
    }
]);



// CartService
appStoreServices.factory("CartService", [
     "$http",
     function($http)
     {
         function CartServiceObject()
         {
             var self = this;

             self.getCart = function(session_id, fn_success, fn_error)
             {
                 $http({
                     method: "GET",
                     url: "rest/cart/" + session_id,
                     cache: false,
                     responseType: "json"
                 }).
                 success(function(data, status, headers, config)
                 {
                     if(data.error == null)
                     {
                         var cart = new CartModel();

                         if(data.response != null &&
                            data.response.products != null)
                         {
	                         for(var i = 0; i < data.response.products.length; ++i)
	                         {
	                             cart.addProduct(new ProductModel(
	                                 data.response.products[i].id,
	                                 data.response.products[i].name,
	                                 data.response.products[i].price,
	                                 data.response.products[i].version,
	                                 data.response.products[i].size,
	                                 data.response.products[i].system,
	                                 data.response.products[i].type,
	                                 data.response.products[i].category,
	                                 data.response.products[i].age,
	                                 data.response.products[i].description
	                             ));
	                         }
                         }

                         fn_success(cart);
                     }
                     else
                     {
                         fn_error(data.error);
                     }
                 }).
                 error(function(data, status, headers, config) { fn_error("AJAX ERROR:\n" + config.method + ": " + config.url + "\nstatus: " + status + "\nresponse: " + angular.toJson(data, true)); });
             };
         }

         return new CartServiceObject();
    }
]);
