// AppStoreControllers module
var appStoreControllers = angular.module("AppStoreControllers", []);



// HeaderController
appStoreControllers.controller("HeaderController", [
    "$scope",
    "$location",
    "DataSharingService",
    function HeaderController($scope, $location, DataSharingService) 
    {
        $scope.shared_data = DataSharingService;

        $scope.isActive = function (view_location)
        {
            return view_location === $location.path();
        };

        // constructor
        {
            $scope.shared_data.order_prop = "name";

            // TODO remove dummy customer
            $scope.shared_data.customer = new CustomerModel("id", "email", "username", "password");

            // TODO remove dummy cart
            $scope.shared_data.cart = new CartModel();
        }
    }
]);



// FooterController
appStoreControllers.controller("FooterController", [
    "$scope",
    "$location",
    "DataSharingService",
    function FooterController($scope, $location, DataSharingService) 
    {
        $scope.shared_data = DataSharingService;
    }
]);



// ProductListController
appStoreControllers.controller("ProductListController", [
    "$scope",
    "ProductRepositoryService",
    "DataSharingService",
    function ($scope, ProductRepositoryService, DataSharingService)
    {
        $scope.shared_data = DataSharingService;
        
        // constructor
        {
            $scope.shared_data.products = ProductRepositoryService.query();
        };
    }
]);



// ProductDetailController
appStoreControllers.controller("ProductDetailController", [
    "$scope",
    "$routeParams",
    "ProductRepositoryService",
    "DataSharingService",
    function($scope, $routeParams, ProductRepositoryService, DataSharingService)
    {
        $scope.shared_data = DataSharingService;

        $scope.getProductDetail = function(product_id)
        {
            for (var i = 0; i < $scope.shared_data.products.length; ++i)
            {
                if ($scope.shared_data.products[i].id === product_id)
                {
                    return $scope.shared_data.products[i];
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
            if (typeof($scope.shared_data.products) === "undefined")
            {
                $scope.shared_data.products = ProductRepositoryService.query(null, function()
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
    "DataSharingService",
    function($scope, CartRepositoryService, DataSharingService)
    {
        $scope.shared_data = DataSharingService;

        // constructor
        {
            $scope.shared_data = DataSharingService;

            if (typeof($scope.shared_data.customer) !== "undefined")
            {
                CartRepositoryService.get($scope.shared_data.customer.id, function(cart)
                {
                    // TODO enable overwrite
                    //$scope.shared_data.cart = cart;
                });
            }
        };
    }
]);
