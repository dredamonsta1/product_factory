// alert("hello");
var app= angular.module("app", []);


app.factory('productFactory', function(){
    var factory ={};

    var product = [
        {name: "iphone7+", price: 800},
        {name: "Macbook Pro", price: 1800},
        {name: "AirPods", price: 160},
        {name: "iPad", price: 900},


    ];
    factory.pushProduct = function(newProduct, callback){
        product.push(newProduct);
        callback(product);
    };

    factory.getAllProducts = function(callback){
        callback(product);
    };
    factory.deleteIndex = function(index,callback){
        product.splice(index, 1);
        callback(product);
    };

    return factory;
});

app.controller('productsController', function($scope, productFactory){

    $scope.products = [];
    $scope.errors ={};
    console.log($scope.products);

    $scope.sortOrder = "N";

    productFactory.getAllProducts(function(data){
        $scope.products = data;
    });



    $scope.addProduct = function(){
        $scope.errors ={};
        var floatPrice = parseFloat($scope.newProduct.price);
        if(isNaN(floatPrice)){
            $scope.errors.price = "not a number bro...";
            $scope.newProduct = {};
        }else{

            $scope.newProduct.price = floatPrice;

            productFactory.pushProduct($scope.newProduct, function(data){
                $scope.products = data;
                $scope.newProduct = {};

                console.log($scope.products);
            });
        }

    };

    $scope.delete = function(index){
        productFactory.deleteIndex(index, function(data){
            // $scope.products = data;
        });

    }

    $scope.sortMe = function(){
        if($scope.sortOrder == "N"){
            //not yet sorted
            $scope.sortOrder = "A";
            $scope.products.sort(function(a,b){

                return a.price - b.price
            })

        }
    }

});