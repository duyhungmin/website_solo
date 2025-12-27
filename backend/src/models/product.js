// import { required } from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(

{
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : [100,"Product name cannot exceed 100 characters"]
    },

    description : {
        type : String,
        required : true,
        maxlength : [1000,"Product description cannot exceed 1000 characters"]
    },
    brand : {
        type : String,
        required : true,
        trim : true,
        maxlength : [50,"Product brand cannot exceed 50 characters"]
    },
    
    images : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        trim : true,
        maxlength : [50,"Product category cannot exceed 50 characters"]
    },
    status : {
        type : String,
        required : true,
        enum : ["In Stock","Out of Stock","Discontinued"],
        default : "In Stock"
    },

    variants : [
    
    {
        sku: {
        type: String,
        required: true
      },
        price : {
        type : Number,
        required : true,
        maxlength : [10,"Product price cannot exceed 10 digits"]
    },
         attribute :{
        type : String,
        required : true,
        trim : true,
        maxlength : [50,"Product attribute cannot exceed 50 characters"]
    },
       stock: {
        type: Number,
        required: true,
        min: 0
      },
      
       image: {
       type : String,
       required: true
       }
    }


    


],



},{ timestamps : true, versionKey: false}
)

const modelProduct = mongoose.model("ModelProduct",productSchema);
export default modelProduct;