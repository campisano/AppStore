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
        when("/products/:product_id*",
        {
            templateUrl: "partials/product_details.html",
            controller: "ProductDetailController"
        }).
        when("/cart",
        {
            templateUrl: "partials/cart.html",
            controller: "CartController",
            auth_required: true
        }).
        when("/account/:action*",
        {
            templateUrl: "partials/account.html",
            controller: "AccountController"
        }).
        otherwise(
        {
            redirectTo: "/products"
        });
    }
]);



// client-site authorization check
// from http://blog.brunoscopelliti.com/deal-with-users-authentication-in-an-angularjs-web-app
appStoreApplication.run( [
    "$rootScope",
    "$location",
    "SessionService",
    function ($rootScope, $location, SessionService)
    {
        $rootScope.$on("$routeChangeStart", function(event, curr_route, prev_route)
        {
            if ((typeof(curr_route.auth_required) !== "undefined") &&
                curr_route.auth_required &&
                (typeof(SessionService.user) === "undefined"))
            {
                // reload the login route
                $location.url("/account/login");
            }
            /*
             * IMPORTANT:
             * It's not difficult to fool the previous control,
             * so it's really IMPORTANT to repeat the control also in the backend,
             * before sending back from the server reserved information.
             */
        });
    }
]);
