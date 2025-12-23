import joi from 'joi';

export const validateProduct = (schema, target = 'body')=>{
    return (req,res,next)=>{
        const {error , value} = schema.validate(req[target],{
            abortEarly : false,
            allowUnknown : true,
            stripUnknown : true
        });
        if(error){
            return res.status(400).json({
                error : "Dữ liệu ko hợp lệ",
                details : error.details.map(detail => detail.message)
            });
        }
        req[target] = value;
        next();
    }
}