import modelUser from "../models/model.user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req,res) => {
    try {
        const users = await modelUser.findOne({email:req.body.email})
        if(users){
            return res.status(400).json({message:`Đã tồn tại ${req.body.email} trong hệ thống`})
        }

        const hashPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashPassword;

        const newUser = await modelUser.create(req.body);
        newUser.password = undefined;
        return res.status(201).json({
            message : "Tạo user thành công",
            data : newUser
        })

    } catch (error) {
     return res.status(500).json({message : error.message})   
    }

}

export const LoginUser = async (req,res) => {
    try {
        
        const user = await modelUser.findOne({email:req.body.email}).select("+password");
        if(!user){
            return res.status(400).json({message:"Email hoặc Password không đúng"})
        }
        console.log(user)
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Password không đúng"})
        }

        const token = jwt.sign({id: user.id},"123456",{expiresIn : "1d"})

    user.password = undefined;
    return res.status(200).json({
        message : "Đăng nhập thành công",
        data : user,
        token
    })

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}