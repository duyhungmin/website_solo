import joi from "joi";
const addressSchema = joi.object({
    street : joi.string().required().messages({
        "string.empty" : "Street không được để trống",
        "any.required" : "Street là bắt buộc",
        "string.base" : "Street phải là chuỗi ký tự"
    }),
    city : joi.string().required().messages({
        "string.empty" : "City không được để trống",
        "any.required" : "City là bắt buộc",
        "string.base" : "City phải là chuỗi ký tự"
    }),
    isDefault : joi.boolean().default(false).messages({
        "boolean.base" : "isDefault phải là giá trị boolean"
    })
});

export const registerSchema = joi.object({

    username : joi.string().required().messages({
        "string.empty" : "Username không được để trống",
        "any.required" : "Username là bắt buộc",
        "string.base" : "Username phải là chuỗi ký tự"
    }),
    email : joi.string().email().required().messages({
        "string.empty" : "Email không được để trống",
        "any.required" : "Email là bắt buộc",
        "string.email" : "Email không đúng định dạng",
        "string.base" : "Email phải là chuỗi ký tự"
    }),
    password : joi.string().min(6).required().messages({
        "string.empty" : "Password không được để trống",
        "any.required" : "Password là bắt buộc",
        "string.min" : "Password phải có ít nhất 6 ký tự",
        "string.base" : "Password phải là chuỗi ký tự"
    }),
    role : joi.string().valid("user","admin").default("user").messages({
        "string.base" : "Role phải là chuỗi ký tự",
        "any.only" : "Role phải là 'user' hoặc 'admin'"
    }),
    addresses : joi.array().items(addressSchema),
    active : joi.boolean().messages({
        "boolean.base" : "Active phải là giá trị boolean"
    })

})
    
export const loginSchema = joi.object({
    email: joi.string().required().email().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",}),
    
    password: joi.string().required().messages({
        "string.empty": "Password không được để trống",
        "any.required": "Password là bắt buộc",
        "string.base": "Password phải là chuỗi ký tự"
    })    
})