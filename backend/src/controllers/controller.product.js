import modelProduct from "../models/product.js";

// create product

export const createProducts = async (req,res)=>{
    try {
        const products = await modelProduct.create(req.body);
        return res.status(201).json({
            message : "Product created successfully",
            data : products
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}

// get all products 

export const getAllProducts = async(req,res)=>{
    try {
        const products = await modelProduct.find();
        return res.status(200).json({
            message : "Products fetched successfully",
            data : products
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}

// get product by id 
 
export const getProductById = async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await modelProduct.findById(id);
        if(!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        return res.status(200).json({
            message : "Product fetched successfully",
            data : product
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}

// update product by id

export const updateProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await modelProduct.findByIdAndUpdate(id,req.body,{
            new : true,
            runValidators : true
        })

        if(!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }

        return res.status(200).json({
            message : "Product updated successfully",
            data : product
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}

// delete product by id

export const deleteProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await modelProduct.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        return res.status(200).json({
            message : "Product deleted successfully",
            data : product
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : error.message
        })
    }
}