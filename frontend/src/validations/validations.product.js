import joi from 'joi';

export const createProductSchema = joi.object({
    name : joi.string().required().max(100).messages({
        "string.base": "Product name must be a string",
        "string.empty": "Product name is required",
        "string.max": "Product name must not exceed {#limit} characters",
        "any.required": "Product name is required",
    }),
    price : joi.number().required().min(0).messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least {#limit}",
        "any.required": "Price is required",
    }),
    description : joi.string().required().messages({
        "string.base": "Description must be a string",
    }),
    brand: joi.string().required().max(50).messages({
        "string.base": "Brand must be a string",
        "string.empty": "Brand is required",
        "string.max": "Brand must not exceed {#limit} characters",
        "any.required": "Brand is required",
    }),
    attribute: joi.string().required().max(50).messages({
        "string.base": "Attribute must be a string",
        "string.empty": "Attribute is required",
        "string.max": "Attribute must not exceed {#limit} characters",
        "any.required": "Attribute is required",
    }),
    image : joi.string().required().messages({
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
})

export const updateProductSchema = createProductSchema.fork(
    ['name', 'price', 'description', 'brand', 'attribute', 'image', 'category', 'status'
    ],
    (schema) => schema.optional()
)