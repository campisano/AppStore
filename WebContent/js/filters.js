// AppStoreFilters module
var appStoreFilters = angular.module("AppStoreFilters", []);



// CheckmarkFilter filter
appStoreFilters.filter("CheckmarkFilter",
    function()
    {
        return function(input)
        {
            return input ? "\u2713" : "\u2718";
        };
    }
);



appStoreFilters.filter("NewlineToBrFilter",
    function()
    {
        return function(input)
        {
            return input.replace(/\n/g, "<br/>");
        };
    }
);



appStoreFilters.filter("ImagePathFilter", [
    "DataSharingService",
    function (DataSharingService)
    {
        return function(product)
        {
            return DataSharingService.getImagePathFromProduct(product);
        };
    }
]);
