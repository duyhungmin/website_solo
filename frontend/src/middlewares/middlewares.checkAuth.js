import jwt from 'jsonwebtoken';
import modelUser from "../models/model.user"

export const checkAuth = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    if(!authHeader){

        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({ error: "Unauthorized: Malformed token" });
    }

    jwt.verify(token,"123456",(err,decode)=>{
        if(err){
            return res.status(401).json({ error: "Unauthorized: sai token hoặc hết hạn" });
        }
        req.userId = decode._id || decode.id;
        console.log(decode)
        next();
    })

    console.log(req.headers)

}

export const checkPermission = (...roles)=>{
    return async (req,res,next)=>{
        try {
            
            const user = await modelUser.findById(req.userId);
            if(!user){
                return res.status(404).json({ error: "User not found" });
            }

            const isPermission = roles.includes(user.role);
            if(!isPermission){
                return res.status(403).json({ error: "Forbidden: You don't have enough permission" });
            }

            next();

        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
}
}