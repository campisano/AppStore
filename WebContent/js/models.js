// customer model
function CustomerModel(id, email, username, password)
{
    var self = this;
    self.id = id;
    self.email = email;
    self.username = name;
    self.password = password;
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
        if(! product instanceof ProductModel)
        {
            throw "StoreModel.addProduct() parameter must be a ProductModel";
        }
        
        if(self.products.filter(function (item) { return item.id === product.id; }))
        {
            throw "StoreModel.addProduct() alredy exist a product with same id";
        }
        
        self.products.push(product);
    };
}



// cart model
function CartModel()
{
    var self = this;
    self.products = new Array();

    self.addProduct = function(product)
    {
        if(! product instanceof ProductModel)
        {
            throw "CartModel.addProduct() parameter must be a ProductModel";
        }
        
        if(self.products.filter(function (item) { return item.id === product.id; }))
        {
            throw "CartModel.addProduct() alredy exist a product with same id";
        }
        
        self.products.push(product);
    };

    self.removeProduct = function(id)
    {
        for (var i = self.products.length - 1; i >= 0; --i)
        {
            if (self.products[i].id === id)
            {
                self.products.splice(i, 1);

                return;
            }
        }
        
        throw "CartModel.removeProduct() can't find a product with this id";
    };

    self.getTotalPrice = function()
    {
        var total = 0.0;

        for (var i=0; i < self.products.length; ++i)
        {
            total += self.products[i].price;
        }

        return total;
    };
}
