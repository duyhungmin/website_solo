import mongoose from "mongoose"

const CheckOutSchema = new mongoose.Schema(
    {

    user : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "ModelUser",
        required :true


    },

    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"ModelProduct",
                required: true
            },

            name:String,
            price : Number,
            image: String,
            quantity : Number

        }
    ],

    totalPrice : {
        type:Number,
        required: true
    },

    shippingAddress :{
        fullname: String,
        phone : String,
        address: String,
        note : String
    },

    paymentMethod : {
        type : String,
        enum: ["cod","online"],
        default:"cod"
    },

    paymentStatus : {
        type: String,
        enum :["unpaid","paid"],
        default:"unpaid"
    },

    status : {
        type: String,
        enum: ["pending","processing","completed","cancelled"],
        default: "pending"
    }


},{timestamps: true, versionKey:false}
)


export const ModelCheckOutCart = mongoose.model("ModelCheckOutCart",CheckOutSchema)

export default ModelCheckOutCart