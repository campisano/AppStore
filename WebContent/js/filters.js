// AppStoreFilters module
var appStoreFilters = angular.module("AppStoreFilters", []);



// CheckmarkFilter filter
appStoreFilters.filter("CheckmarkFilter",
    function()
    {
        return function(bool_text)
        {
            return bool_text ? "\u2713" : "\u2718";
        };
    }
);



appStoreFilters.filter("NewlineToBrFilter",
    function()
    {
        return function(text)
        {
            if(typeof(text) === "undefined")
            {
                return "";
            }

            return text.replace(/\n/g, "<br/>");
        };
    }
);



appStoreFilters.filter("ImagePathFilter", [
    "DataSharingService",
    function (DataSharingService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return DataSharingService.getImagePathFromProduct(product);
        };
    }
]);



appStoreFilters.filter("ReferenceURLFilter", [
    "DataSharingService",
    function (DataSharingService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return DataSharingService.getReferenceURLFromProduct(product);
        };
    }
]);
