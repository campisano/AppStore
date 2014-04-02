// AppStoreControllers module
var appStoreControllers = angular.module("AppStoreControllers", []);



// HeaderController
appStoreControllers.controller("HeaderController", [
    "$scope",
    "$location",
    "SessionService",
    "AccountService",
    "CartService",
    function HeaderController($scope, $location, SessionService, AccountService, CartService) 
    {
        $scope.isActive = function(view_location)
        {
            return view_location === $location.path();
        };

        // constructor
        {
            $scope.session = SessionService;

            SessionService.order_prop = "name";

            if (typeof(SessionService.user) === "undefined")
            {
                var cookie_session = Util.getCookie("session");

                if (cookie_session != "")
                {
                    AccountService.getSession(
                        cookie_session,
                        function(data)
                        {
                            SessionService.user = data;

                            CartService.getCart(
                                SessionService.user.session_id,
                                function(data)
                                {
                                    SessionService.cart = data;
                                    $location.url("/");
                                },
                                function(data) {
                                    alert("ERROR on HeaderController.getSession():\nresponse: " + data);
                            });
                        },
                        function(data) {
                            alert("ERROR on HeaderController.getSession():\nresponse: " + data);
                        }
                    );
                }
            }
        }
    }
]);



// FooterController
appStoreControllers.controller("FooterController", [
    "$scope",
    "$location",
    "SessionService",
    function FooterController($scope, $location, SessionService) 
    {
        // constructor
        {
            $scope.session = SessionService;
        };
    }
]);



// ProductListController
appStoreControllers.controller("ProductListController", [
    "$scope",
    "ProductService",
    "SessionService",
    function($scope, ProductService, SessionService)
    {
        // constructor
        {
            $scope.session = SessionService;

            ProductService.getProductList(
                function(data)
                {
                    SessionService.products = data;
                },
                function(data) {
                    alert("ERROR on ProductListController.getProductList():\nresponse: " + data);
                }
            );
        };
    }
]);



// ProductDetailController
appStoreControllers.controller("ProductDetailController", [
    "$scope",
    "$routeParams",
    "ProductService",
    "SessionService",
    function($scope, $routeParams, ProductService, SessionService)
    {
        $scope.getProductDetail = function(product_id)
        {
            ProductService.getProductDetail(
                $routeParams.product_id,
                function(data)
                {
                    $scope.product = data;
                },
                function(data) {
                    alert("ERROR on ProductDetailController.getProductDetail():\nresponse: " + data);
                }
            );
        };

        $scope.setImage = function(image_url)
        {
            $scope.main_image_url = image_url;
        };

        // constructor
        {
            $scope.session = SessionService;

            $scope.getProductDetail($routeParams.product_id);
        };
    }
]);



// AccountController
appStoreControllers.controller("AccountController", [
    "$scope",
    "$routeParams",
    "$location",
    "$timeout",
    "AccountService",
    "SessionService",
    "CartService",
    function($scope, $routeParams, $location, $timeout, AccountService, SessionService, CartService)
    {
        $scope.register = function()
        {
            AccountService.register(
                $scope.form.username,
                $scope.form.password,
                $scope.form.email,
                function(data)
                {
                    SessionService.user = data;

                    CartService.getCart(
                        SessionService.user.session_id,
                        function(data)
                        {
                            SessionService.cart = data;
                            $location.url("/");
                        },
                        function(data) {
                            alert("ERROR on AccountController.register():\nresponse: " + data);
                    });
                },
                function(data) {
                    alert("ERROR on AccountController.register():\nresponse: " + data);
                }
            );
        };

        $scope.edit = function()
        {
            AccountService.edit(
                SessionService.user.session_id,
                $scope.form.username,
                $scope.form.password,
                $scope.form.email,
                function(data)
                {
                    SessionService.user.username = data.username;
                    SessionService.user.email = data.email;
                    $location.url("/");
                },
                function(data) {
                    alert("ERROR on AccountController.edit():\nresponse: " + data);
                }
            );
        };

        $scope.login = function()
        {
            AccountService.login(
                $scope.form.username,
                $scope.form.password,
                function(data)
                {
                    SessionService.user = data;
                    document.cookie="session=" + SessionService.user.session_id;
                    CartService.getCart(
                        SessionService.user.session_id,
                        function(data)
                        {
                            SessionService.cart = data;
                            $location.url("/");
                        },
                        function(data) {
                            alert("ERROR on AccountController.login():\nresponse: " + data);
                    });
                },
                function(data) {
                    alert("ERROR on AccountController.login():\nresponse: " + data);
                }
            );
        };

        $scope.logout = function()
        {
            AccountService.logout(
                SessionService.user.session_id,
                function()
                {
                    $scope.form.username = SessionService.user.username;
                    document.cookie="session=";
                    delete SessionService.user;
                    delete SessionService.cart;
                },
                function(data) {
                    alert("ERROR on AccountController.logout():\nresponse: " + data);
                }
            );
        };

        // constructor
        {
            $scope.session = SessionService;
            $scope.form = new Object();
            $scope.action = $routeParams.action;
            $scope.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
        };
    }
]);



// CartController
appStoreControllers.controller("CartController", [
    "$scope",
    "CartService",
    "SessionService",
    "ModalService",
    function($scope, CartService, SessionService, ModalService)
    {
        // constructor
        {
            $scope.session = SessionService;

            CartService.getCart(
                SessionService.user.session_id,
                function(data)
                {
                    SessionService.cart = data;
                },
                function(data) {
                    alert("ERROR on CartController.getCart():\nresponse: " + data);
            });
        };

        $scope.addProduct = function(product_id)
        {
            CartService.addProduct(
                SessionService.user.session_id,
                product_id,
                function(data)
                {
                    SessionService.cart = data;
                },
                function(data) {
                    alert("ERROR on CartController.addProduct():\nresponse: " + data);
            });
        };

        $scope.removeProduct = function(product_id)
        {
            CartService.removeProduct(
                SessionService.user.session_id,
                product_id,
                function(data)
                {
                    SessionService.cart = data;
                },
                function(data) {
                    alert("ERROR on CartController.removeProduct():\nresponse: " + data);
            });
        };

        $scope.removeAllProducts = function()
        {
            CartService.removeAllProducts(
                SessionService.user.session_id,
                function(data)
                {
                    SessionService.cart = data;
                },
                function(data) {
                    alert("ERROR on CartController.removeAllProducts():\nresponse: " + data);
            });
        };

        $scope.checkout = function(payment_id)
        {
        	SessionService.payment_id = payment_id;

            var modalOptions =
            {
                closeButtonText: "Fechar",
                actionButtonText: "Confirmar",
            };

            var modalDefaults =
            {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: "partials/checkout.html",
                controller: ModalService.getDefaultController(modalOptions, SessionService)
            };

            ModalService.showModal(modalDefaults, modalOptions).then(function (result)
            {
                CartService.checkout(
                    SessionService.user.session_id,
                    payment_id,
                    function(data)
                    {
                        ModalService.alert("Email enviado com sucesso!");
                        SessionService.cart = data;
                    },
                    function(data)
                    {
                        alert("ERROR on CartController.checkout():\nresponse: " + data);
                    }
                );
            });
        };
    }
]);
