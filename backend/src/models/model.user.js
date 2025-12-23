
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    username : {
        type : String,
        required :[true,"Username is required"],
        trim : true,
        maxlength : [50,"Username cannot exceed 50 characters"]
    },
    email :{
        type : String,
        required : [true,"Email is required"],
        unique : true,
        match:[/^\S+@\S+\.\S+$/,"Please use a valid email address"]
    },
    password :{
        type : String,
        required : [true,"Password is required"],
        minlength : [6,"Password must be at least 6 characters"],
        select: false // k trả về pass trong các truy vấn
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    phone : { 
        type : String,
        validate : {
            validator : (v)=> /^\d{10}$/.test(v),
            message : props => `${props.value} is not a valid 10 digit phone number!`
    },
    addresses :[
        {
            street : String,
            city : String,
            isDefault : { 
                type : Boolean , 
                default : false 
            },
        },
    ],
    active : {
        type : Boolean,
        default : true
    },
}
},
{ timestamps : true, versionKey: false }
)

export const modelUser = mongoose.model("ModelUser",userSchema);

export default modelUser;