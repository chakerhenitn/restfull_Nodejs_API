
const mongoose = require('mongoose');
const createError = require('http-errors');
const Product = require('../Modules/Product.model')
module.exports = {

    getAllProducts : async (req, res, next)=>{
        try {
            //const result = await Product.find().select('_id name price')
            const result = await Product.find({}, {__v : 0})
    res.send(result);
            
        } catch (error) {
            console.log(error.message);
        }
    },
findProductById : async (req, res, next)=>{
    const id = req.params.id;
   try {
    //const product = await Product.findById(id).select('_id name price');
    const product = await Product.findById(id, {__v:0});

    if(!product){
        throw createError(404, 'Product not exist');
    }
    res.send(product);
   } catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400, 'Invalid product requested ID'));
        return;
    }
    next(error);
   }
},

createNewProduct : async (req, res, next)=>{

    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        if(error.name === 'ValidationError'){
        next(createError(422, error.message))
        return;
        }
        next(error);
        
    }
    
    },

updateProduct : async (req, res, next)=>{
    
    try {
        const id = req.params.id;
        const update = req.body;
        const option = {new: true};
        const result = await Product.findByIdAndUpdate(id, update, option);
        if(!result){
            throw createError(404, 'Product doesnt exist');
        }
        res.send(result);
    } catch (error) {
       console.log(error.message); 
       if(error instanceof mongoose.CastError){
        next(createError(400, 'Invalid product requested ID'));
        return;
    }
    next(error);
    }
},

deletingProduct : async (req, res, next)=>{
    const id = req.params.id;
   try {
    //const product = await Product.findById(id).select('_id name price');
    const result = await Product.findByIdAndDelete(id, {__v:0});
    if(!result){
        throw createError(404, 'Product not exist');
    }
    res.send(result);
   } catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400, 'Invalid product requested ID'));
        return;
    }
    next(error);
   }
}

};







