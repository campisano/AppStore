// AppStore application main module
var appStoreApplication = angular.module("AppStoreApplication", [
    "ngRoute",
    "ngSanitize",
    "AppStoreControllers",
    "AppStoreFilters",
    "AppStoreServices",
    "AppStoreAnimations"
]);

// app url routes to templates
appStoreApplication.config( [
    "$routeProvider",
    function($routeProvider)
    {
        $routeProvider.
        when("/products",
        {
            templateUrl: "partials/product_list.html",
            controller: "ProductListController"
        }).
        when("/products/:product_id",
        {
            templateUrl: "partials/product_details.html",
            controller: "ProductDetailController"
        }).
        otherwise(
        {
            redirectTo: "/products"
        });
    }
]);
