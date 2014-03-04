// AppStoreControllers module
var appStoreControllers = angular.module("AppStoreControllers", []);

// HeaderController controller
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
    }
]);



// FooterController controller
appStoreControllers.controller("FooterController", [
    "$scope",
    "$location",
    "DataSharingService",
    function FooterController($scope, $location, DataSharingService) 
    {
        $scope.shared_data = DataSharingService;
        $scope.isActive = function (view_location)
        { 
            return view_location === $location.path();
        };
    }
]);



// ProductListController controller
appStoreControllers.controller("ProductListController", [
    "$scope",
    "ProductRepositoryService",
    "DataSharingService",
    function ($scope, ProductRepositoryService, DataSharingService)
    {
        $scope.shared_data = DataSharingService;
        $scope.shared_data.products = ProductRepositoryService.query();
        $scope.shared_data.order_prop = "name";
    }
]);



// ProductDetailController controller
appStoreControllers.controller("ProductDetailController", [
    "$scope",
    "$routeParams",
    "$http",
    "ProductRepositoryService",
    "DataSharingService",
    function($scope, $routeParams, $http, ProductRepositoryService, DataSharingService)
    {
        $scope.shared_data = DataSharingService;
        //$scope.product = ProductRepositoryService.get( { product_id: $routeParams.product_id}, function(product)
        //{
        //    $scope.main_image_url = product.images[0];
        //});

        if (typeof $scope.shared_data.products === "undefined")
        {
            $scope.shared_data.products = ProductRepositoryService.query();
            alert("products empty: the service is async :(\nproducts: '" + $scope.shared_data.products + "'");
        }

        for (var i = $scope.shared_data.products.length - 1; i >= 0; --i)
        {
            if ($scope.shared_data.products[i].id === $routeParams.product_id)
            {
                $scope.product = $scope.shared_data.products[i];

                break;
            }
        }

        //$scope.product = PhoneService.getPhoneDetail($routeParams.phoneId);
        //$scope.main_image_url = product.images[0];

        $scope.setImage = function(image_url)
        {
            $scope.main_image_url = image_url;
        };
    }
]);
