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
    "SessionService",
    function (SessionService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return SessionService.getImagePathFromProduct(product);
        };
    }
]);



appStoreFilters.filter("ReferenceURLFilter", [
    "SessionService",
    function (SessionService)
    {
        return function(product)
        {
            if(typeof(product) === "undefined")
            {
                return "";
            }

            return SessionService.getReferenceURLFromProduct(product);
        };
    }
]);
