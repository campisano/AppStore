// AppStoreDirectives module
var appStoreDirectives = angular.module("AppStoreDirectives", []);



// ConfirmClickDirective
appStoreDirectives.directive("confirmClickDirective", [
    function()
    {
        return { link : function(scope, element, attr)
            {
                var msg = attr.confirmClickDirective || "Are you sure?";
                var clickAction = attr.confirmedClick;
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
