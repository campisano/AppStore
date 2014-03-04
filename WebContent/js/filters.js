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
