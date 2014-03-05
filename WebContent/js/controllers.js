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
        var self = this;

        self.getProductDetail = function(product_id)
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

        $scope.shared_data = DataSharingService;

        if (typeof($scope.shared_data.products) === "undefined")
        {
            $scope.shared_data.products = ProductRepositoryService.query(null, function()
            {
                $scope.product = self.getProductDetail($routeParams.product_id);
            });
        }
        else
        {
            $scope.product = self.getProductDetail($routeParams.product_id);
        }

        $scope.setImage = function(image_url)
        {
            $scope.main_image_url = image_url;
        };
    }
]);
