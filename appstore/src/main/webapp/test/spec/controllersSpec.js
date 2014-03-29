describe("javascript behaviors", function()
{
    // from http://javascript.info/tutorial/type-detection
    {
        it("typeof(undefined) === \"undefined\"", function()
        {
            expect(typeof(undefined) === "undefined").toBe(true);
        });

        it("typeof(0) === \"number\"", function()
        {
            expect(typeof(0) === "number").toBe(true);
        });

        it("typeof(true) === \"boolean\"", function()
        {
            expect(typeof(true) === "boolean").toBe(true);
        });

        it("typeof(\"\") === \"string\"", function()
        {
            expect(typeof("") === "string").toBe(true);
        });

        it("typeof({}) === \"object\"", function()
        {
            expect(typeof({}) === "object").toBe(true);
        });

        it("typeof(null) === \"object\"", function()
        {
            expect(typeof(null) === "object").toBe(true);
        });

        it("typeof(function(){}) === \"function\"", function()
        {
            expect(typeof(function(){}) === "function").toBe(true);
        });

        it("typeof(NaN) === \"number\"", function()
        {
            expect(typeof(NaN) === "number").toBe(true);
        });
    }

    it("1 / 0 == Infinity", function()
    {
        expect(1/0).toBe(Infinity);
    });

    it("new Object().value.subvalue will throw an TypeError exception", function()
    {
        expect(function(){ new Object().value.subvalue; }).toThrowError(TypeError);
    });

    it("typeof(Infinity) === \"number\"", function()
    {
        expect(typeof(Infinity) === "number").toBe(true);
    });

    it("typeof(new Object().value) === \"undefined\"", function()
    {
        expect(typeof(new Object().value) === "undefined").toBe(true);
    });

    it("function Foo(){;}; new Foo() instanceof Foo", function()
    {
        function Foo(){;};
        expect(new Foo() instanceof Foo).toBe(true);
    });
});



describe("AppStoreApplication models", function()
{
    describe("CartModel", function()
    {
        it("addProduct(null) throw an Error exception", function()
        {
            expect(function(){ new CartModel().addProduct(null); }).toThrowError(Error);
        });

        it("addProduct(\"\") throw an Error exception", function()
        {
            expect(function(){ new CartModel().addProduct(""); }).toThrowError(Error);
        });

        it("addProduct(new Object()) throw an Error exception", function()
        {
            expect(function(){ new CartModel().addProduct(new Object()); }).toThrowError(Error);
        });

        it("addProduct(new ProductModel(1)) not throw exception", function()
        {
            expect(function(){ new CartModel().addProduct(new ProductModel(1)); }).not.toThrow();
        });

        it("addProduct(...) increment getNumOfProducts()", function()
        {
            var store_model = new CartModel();
            expect(store_model.getNumOfProducts() === 0).toBe(true);
            store_model.addProduct(new ProductModel(1));
            expect(store_model.getNumOfProducts() === 1).toBe(true);
        });

        it("duplicated id addProduct(new ProductModel(1)) throw an Error exception", function()
        {
            var store_model = new CartModel();
            store_model.addProduct(new ProductModel(1));
            expect(function(){ store_model.addProduct(new ProductModel(1)); }).toThrowError(Error);
        });
    });
});



/*
describe('AppStoreApplication models', function()
{
    describe('PhoneListCtrl', function()
    {
        var scope, ctrl, $httpBackend;

        // Load our app module definition before each test.
        beforeEach(module("AppStoreApplication"));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller)
        {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([ {name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));
    });
});
*/
