// AppStoreControllers module
var appStoreControllers = angular.module("AppStoreControllers", []);



// HeaderController
appStoreControllers.controller("HeaderController", [
    "$scope",
    "$location",
    "SessionService",
    function HeaderController($scope, $location, SessionService) 
    {
        $scope.isActive = function (view_location)
        {
            return view_location === $location.path();
        };

        // constructor
        {
            $scope.session = SessionService;

            SessionService.order_prop = "name";
        }
    }
]);



// FooterController
appStoreControllers.controller("FooterController", [
    "$scope",
    "$location",
    "SessionService",
    function FooterController($scope, $location, SessionService) 
    {
        // constructor
        {
            $scope.session = SessionService;
        };
    }
]);



// ProductListController
appStoreControllers.controller("ProductListController", [
    "$scope",
    "ProductService",
    "SessionService",
    function ($scope, ProductService, SessionService)
    {
        // constructor
        {
            $scope.session = SessionService;

            ProductService.getProductList(
                function(data)
                {
                    SessionService.products = data;
                },
                function(data) {
                    alert("ERROR on ProductListController.getProductList():\nresponse: " + data);
                }
            );
        };
    }
]);



// ProductDetailController
appStoreControllers.controller("ProductDetailController", [
    "$scope",
    "$routeParams",
    "ProductService",
    "SessionService",
    function($scope, $routeParams, ProductService, SessionService)
    {
        $scope.getProductDetail = function(product_id)
        {
            ProductService.getProductDetail(
                $routeParams.product_id,
                function(data)
                {
                    $scope.product = data;
                },
                function(data) {
                    alert("ERROR on ProductDetailController.getProductDetail():\nresponse: " + data);
                }
            );
        };

        $scope.setImage = function(image_url)
        {
            $scope.main_image_url = image_url;
        };

        // constructor
        {
            $scope.session = SessionService;

            $scope.getProductDetail($routeParams.product_id);
        };
    }
]);



// AccountController
appStoreControllers.controller("AccountController", [
    "$scope",
    "$routeParams",
    "$location",
    "$timeout",
    "AccountService",
    "SessionService",
    "CartService",
    function($scope, $routeParams, $location, $timeout, AccountService, SessionService, CartService)
    {
        $scope.register = function ()
        {
            AccountService.register(
                $scope.form.username,
                $scope.form.password,
                $scope.form.email,
                function(data)
                {
                    SessionService.user = data;

                    CartService.getCart(
                        SessionService.user.session_id,
                        function(data)
                        {
                            SessionService.cart = data;
                            $location.url("/");
                        },
                        function(data) {
                            alert("ERROR on CartController.getCart():\nresponse: " + data);
                    });
                },
                function(data) {
                    alert("ERROR on AccountController.register():\nresponse: " + data);
                }
            );
        };

        $scope.edit = function ()
        {
            AccountService.edit(
                SessionService.user.session_id,
                $scope.form.username,
                $scope.form.password,
                $scope.form.email,
                function(data)
                {
                    SessionService.user.username = data.username;
                    SessionService.user.email = data.email;
                    $location.url("/");
                },
                function(data) {
                    alert("ERROR on AccountController.edit():\nresponse: " + data);
                }
            );
        };

        $scope.login = function ()
        {
            AccountService.login(
                $scope.form.username,
                $scope.form.password,
                function(data)
                {
                    SessionService.user = data;

                    CartService.getCart(
                        SessionService.user.session_id,
                        function(data)
                        {
                            SessionService.cart = data;
                            $location.url("/");
                        },
                        function(data) {
                            alert("ERROR on CartController.getCart():\nresponse: " + data);
                    });
                },
                function(data) {
                    alert("ERROR on AccountController.login():\nresponse: " + data);
                }
            );
        };

        $scope.logout = function ()
        {
            AccountService.logout(
                SessionService.user.session_id,
                function()
                {
                    $scope.form.username = SessionService.user.username;
                    delete SessionService.user;
                    delete SessionService.cart;
                },
                function(data) {
                    alert("ERROR on AccountController.logout():\nresponse: " + data);
                }
            );
        };

        // constructor
        {
            $scope.session = SessionService;
            $scope.form = new Object();
            $scope.action = $routeParams.action;
            $scope.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

            if($routeParams.action == "logout")
            {
                $scope.logout();
            }
        };
    }
]);



// CartController
appStoreControllers.controller("CartController", [
    "$scope",
    "CartService",
    "SessionService",
    function($scope, CartService, SessionService)
    {
        // constructor
        {
            $scope.session = SessionService;

            CartService.getCart(
                SessionService.user.session_id,
                function(data)
                {
                    SessionService.cart = data;
                },
                function(data) {
                    alert("ERROR on CartController.getCart():\nresponse: " + data);
            });
        };
    }
]);
