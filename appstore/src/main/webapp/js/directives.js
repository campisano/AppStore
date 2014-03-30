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
/*
        var getTemplate = function(contentType)
        {
            var templateLoader,
            baseUrl = "partials/",
            templateMap = {
                paypal: "payment.html",
                google: "payment.html"
            };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl
            //, {cache: $templateCache}
            );

            return templateLoader;
        };

        var linker2 = function(scope, element, attrs)
        {
            var loader = getTemplate(attrs.confirmDirective);
            var clickAction = attrs.confirmedOnclick;

            var dialog = {};
            loader.success(function(html)
            {
                dialog = $compile(html)(scope);
                dialog = jQuery(dialog).dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
            }).then(function(data)
            {
                element.bind("click", function(event)
                {
                    dialog.dialog("open");
                });

            }, function(error)
            {
                alert("bbb" + error);
            });
        };

        return {
            restrict: "E",
            scope: {
                post:"="
            },
            link: linker
        };
*/
    }
]);
