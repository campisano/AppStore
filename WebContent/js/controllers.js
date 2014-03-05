// AppStoreControllers module
var appStoreControllers = angular.module("AppStoreControllers", []);



// HeaderController
appStoreControllers.controller("HeaderController", [
    "$scope",
    "$location",
    "SessionService",
    function HeaderController($scope, $location, SessionService) 
    {
        $scope.session = SessionService;

        $scope.isActive = function (view_location)
        {
            return view_location === $location.path();
        };

        // constructor
        {
            SessionService.order_prop = "name";

            // TODO remove dummy customer
            SessionService.customer = new CustomerModel("id", "email", "username", "password");

            // TODO remove dummy cart
            SessionService.cart = new CartModel();
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
        $scope.session = SessionService;
    }
]);



// ProductListController
appStoreControllers.controller("ProductListController", [
    "$scope",
    "ProductRepositoryService",
    "SessionService",
    function ($scope, ProductRepositoryService, SessionService)
    {
        $scope.session = SessionService;

        // constructor
        {
            SessionService.products = ProductRepositoryService.query();
        };
    }
]);



// ProductDetailController
appStoreControllers.controller("ProductDetailController", [
    "$scope",
    "$routeParams",
    "ProductRepositoryService",
    "SessionService",
    function($scope, $routeParams, ProductRepositoryService, SessionService)
    {
        $scope.session = SessionService;

        $scope.getProductDetail = function(product_id)
        {
            for (var i = 0; i < SessionService.products.length; ++i)
            {
                if (SessionService.products[i].id === product_id)
                {
                    return SessionService.products[i];
                }
            }

            throw "ProductDetailController.getProductDetail() cannot find a product for this id: " + product_id;
        };

        $scope.setImage = function(image_url)
        {
            $scope.main_image_url = image_url;
        };

        // constructor
        {
            if (typeof(SessionService.products) === "undefined")
            {
                SessionService.products = ProductRepositoryService.query(null, function()
                {
                    $scope.product = $scope.getProductDetail($routeParams.product_id);
                });
            }
            else
            {
                $scope.product = $scope.getProductDetail($routeParams.product_id);
            }
        };
    }
]);



// CartController
appStoreControllers.controller("CartController", [
    "$scope",
    "CartRepositoryService",
    "SessionService",
    function($scope, CartRepositoryService, SessionService)
    {
        $scope.session = SessionService;

        // constructor
        {
            if (typeof(SessionService.customer) !== "undefined")
            {
                CartRepositoryService.get(SessionService.customer.id, function(cart)
                {
                    // TODO enable overwrite
                    //SessionService.cart = cart;
                });
            }
        };
    }
]);
