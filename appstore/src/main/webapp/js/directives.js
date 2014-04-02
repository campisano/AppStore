// AppStoreDirectives module
var appStoreDirectives = angular.module("AppStoreDirectives", []);



// confirmDirective
// from https://coderwall.com/p/mgtrkg
appStoreDirectives.directive("confirmDirective", [
    "$http",
    "$compile",
    function($http, $compile)
    {
        return {
            link : function(scope, element, attr)
            {
                var msg = attr.confirmDirective || "Are you sure?";
                var clickAction = attr.confirmedOnclick;
                element.bind('click', function(event)
                {
                    if (window.confirm(msg))
                    {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }
]);
