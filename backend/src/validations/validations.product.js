import joi from 'joi';

const variantSchema = joi.object({

    sku: joi.string().required().messages({
        "string.base":"SKU must be string",
        "string.empty":"Sku is required",
        "any.required":"Sku is required"
    }),

    price: joi.number().min(0).required().messages({
        "number.base":"Price must be a number",
        "number.min":"Price must at least {#limit}",
        "any.required":"Price is required"
    }),
    attribute : joi.string().max(50).required().messages({
        "string.base":"Attribute must be a string",
        "string.empty":"attribute is required",
        "string.max":"atrribute must not exceed {#limit} characters",
        "any.required":"atrribute is required"
    }),
    stock : joi.number().min(0).required().messages({
        "number.base":"stock is must be a number",
        "number.min":"stock cannot be negative",
        "any.required":"stock is required"
    }),
    image : joi.string().required().messages({
        "string.base":"image must be a string",
        "string.empty":"image is required",
        "any.required":"image is required"
    })
})


export const createProductSchema = joi.object({
    name : joi.string().required().max(100).messages({
        "string.base": "Product name must be a string",
        "string.empty": "Product name is required",
        "string.max": "Product name must not exceed {#limit} characters",
        "any.required": "Product name is required",
    }),
    // price : joi.number().required().min(0).messages({
    //     "number.base": "Price must be a number",
    //     "number.min": "Price must be at least {#limit}",
    //     "any.required": "Price is required",
    // }),
    description : joi.string().required().messages({
        "string.base": "Description must be a string",
    }),
    brand: joi.string().required().max(50).messages({
        "string.base": "Brand must be a string",
        "string.empty": "Brand is required",
        "string.max": "Brand must not exceed {#limit} characters",
        "any.required": "Brand is required",
    }),
    // attribute: joi.string().required().max(50).messages({
    //     "string.base": "Attribute must be a string",
    //     "string.empty": "Attribute is required",
    //     "string.max": "Attribute must not exceed {#limit} characters",
    //     "any.required": "Attribute is required",
    // }),
    images : joi.string().required().messages({
        "string.base": "Image must be a string",
        "string.empty": "Image is required",
        "any.required": "Image is required",
    }),
    category: joi.string().required().max(50).messages({
        "string.base": "Category must be a string",
        "string.empty": "Category is required",
        "string.max": "Category must not exceed {#limit} characters",
        "any.required": "Category is required",
    }),
    status: joi.string().valid("In Stock","Out of Stock","Discontinued").required().messages({
        "string.base": "Status must be a string",
        "any.only": "Status must be one of [In Stock, Out of Stock, Discontinued]",
        "any.required": "Status is required",
    }),

    variants : joi.array().items(variantSchema).min(1).required().messages({

        "array.base":"Variants must be a array",
        "array.min":"Product must have at lease one variant",
        "any.required":"Variants must requierd"
    })

    
})

export const updateProductSchema = createProductSchema.fork(
    ['name', 'description', 'brand','images', 'category', 'status', 'variants' ],
    (schema) => schema.optional()
)