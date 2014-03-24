// user model
function UserModel(session_id, username, email)
{
    var self = this;
    self.session_id = session_id;
    self.username = username;
    self.email = email;
}



// product model
function ProductModel(id, name, price, version, size, system, type, category, age, description)
{
    var self = this;
    self.id = id;
    self.name = name;
    self.price = price;
    self.version = version;
    self.size = size;
    self.system = system;
    self.type = type;
    self.category = category;
    self.age = age;
    self.description = description;
}



// store model
function StoreModel()
{
    var self = this;
    self.products = new Array();

    self.addProduct = function(product)
    {
        if( product === null)
        {
            throw new Error("StoreModel.addProduct() parameter must be a ProductModel, it's null");
        }
        
        if(! (product instanceof ProductModel))
        {
            throw new Error("StoreModel.addProduct() parameter must be a ProductModel, it's a " + typeof(product));
        }

        if(self.contains(product.id))
        {
            throw new Error("StoreModel.addProduct() alredy exist a product with same id: " + product.id);
        }

        self.products.push(product);
    };

    // TODO duplicated with CartModel
    self.contains = function(product_id)
    {
        for(var i = 0; i < self.products.length; ++i)
        {
            if (self.products[i].id === product_id)
            {
                return true;
            }
        }

        return false;
    };

    // TODO duplicated with CartModel
    self.getNumOfProducts = function()
    {
        return self.products.length;
    };
}



// shopping cart model
function CartModel()
{
    var self = this;
    self.products = new Array();

    self.addProduct = function(product)
    {
        if( product === null)
        {
            throw new Error("CartModel.addProduct() parameter must be a ProductModel, it's null");
        }

        if(! (product instanceof ProductModel))
        {
            throw new Error("CartModel.addProduct() parameter must be a ProductModel, it's a " + typeof(product));
        }

        if(self.contains(product.id))
        {
            throw new Error("CartModel.addProduct() alredy exist a product with same id: " + product.id);
        }

        self.products.push(product);
    };

    self.removeProduct = function(product_id)
    {
        for (var i = self.products.length - 1; i >= 0; --i)
        {
            if (self.products[i].id === product_id)
            {
                self.products.splice(i, 1);

                return;
            }
        }
        
        throw new Error("CartModel.removeProduct() can't find a product with this id: " + product_id);
    };

    self.removeAllProducts = function()
    {
        while (self.products.length > 0)
        {
            self.products.pop();
        }
    };

    // TODO util funtion
    // from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
    self.isNumber = function(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    self.getTotalPrice = function()
    {
        var total = 0.0;

        for (var i=0; i < self.products.length; ++i)
        {
            if(self.isNumber(self.products[i].price))
            {
                total += parseFloat(self.products[i].price);
            }
        }

        return total;
    };

    // TODO duplicated with StoreModel
    self.getNumOfProducts = function()
    {
        return self.products.length;
    };

    // TODO duplicated with StoreModel
    self.contains = function(product_id)
    {
        for(var i = 0; i < self.products.length; ++i)
        {
            if (self.products[i].id === product_id)
            {
                return true;
            }
        }

        return false;
    };
}
