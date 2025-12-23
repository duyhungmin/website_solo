import mongoose from "mongoose"

const cartScheme = new mongoose.Schema(
   
    {
        user : {
            
            type : mongoose.Schema.Types.ObjectId,
            ref: "ModelUser",
            required:true,
            unique: true // 1 user chỉ có 1 giỏ hàng hoạt động
        },

        items : [
            {
                product:{
                   
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ModelProduct",
                    required:true
                
                },

                    name: String,
                    price:Number,
                    image: String,

                quantity :{
                    type:Number,
                    default: 1,
                    min: 1
                 }
            }
        ],

        totalPrice :{
            type:Number,
            default:0
        },
 
        status:{
            type:String,
            enum:["active", "odered"],
            default:"active"
        }
       

        
    },{timestamps:true, versionKey:false}
)

export const ModelCart =  mongoose.model("ModelCart",cartScheme)

export default ModelCart