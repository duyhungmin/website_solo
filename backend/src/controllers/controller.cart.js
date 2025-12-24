import modelCart from "../models/model.cart";
import modelProduct from "../models/product";
export const getCart = async(req,res)=>{

  try {
      const userId = req.userId
    //  const userId = "69442e00792d233b651e7830"
    console.log(userId)

    let cart = await modelCart.findOne({user : userId, status:"active"})
        console.log(cart)

    if(!cart){
        cart = await modelCart.create({user:userId, items:[]})
    }
     
    return res.status(200).json({
        message:"successful cart",
        data : cart
      })
  } catch (error) {
    return res.status(500).json({message : "Internal server error",error : error.message})

}
}

export const addToCart = async (req,res)=>{

     try {
    const { productId, quantity = 1 } = req.body
    const userId = req.userId
    const qty = Number(quantity) || 1
    console.log(productId)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (!productId) {
      return res.status(400).json({ message: "Missing productId" })
    }

    const product = await modelProduct.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let cart = await modelCart.findOne({ user: userId, status: "active" })
    if (!cart) {
      cart = await modelCart.create({ user: userId, items: [] })
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      })
    }

    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    )

    await cart.save()

    return res.status(200).json({
      message: "Add to cart successfully",
      data: cart
    })

  } catch (error) {
    console.log("ADD TO CART ERROR:", error)
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }

    
}


export const updateCart = async (req,res)=>{

  try {
      const {productId, quantity} = req.body
    const userId = req.userId

    if(quantity < 1){
        return res.status(400).json({message : "Quantity must be >= 1"})
    }

    const cart = await modelCart.findOne({user:userId, status:"active"})
    
    if(!cart) return res.status(400).json({message:"cart not found"})

     const item = cart.items.find(
        item => item.product.toString() === productId 
     ) 
     
    if(!item){
        return res.status(404).json({ message: "Product not in cart" });
    } 
    
    item.quantity = quantity

    cart.totalPrice = cart.items.reduce(
        (sum,i)=> sum + i.price * i.quantity, 0
    )

    await cart.save()
  return res.status(200).json({
        message:"successful cart",
        data : cart
      })
  } catch (error) {
      return res.status(500).json({message:"Errror",err : error.message})
  }
}


export const deleteFromCart = async (req,res)=>{

  try {
      const {productId} = req.params
    const userId = req.userId

    const cart = await modelCart.findOne({user: userId, status:"active"})
    if(!cart) return res.status(400).json({message:"Product not found"})

    cart.items = cart.items.filter(item => item.product.toString() !== productId)   
    cart.totalPrice = cart.items.reduce(
        (sum,i)=> sum + i.price * i.quantity,0
    )

    await cart.save()
    return res.status(200).json({
        message:"successful cart",
        data : cart
      })
  } catch (error) {
      return res.status(500).json({message:"Errror",err : error.message})
  }


}

export const updateQuantity = async (req,res)=>{
   try {
     const {productId, type} = req.body

    const userId = req.userId
    // const userId = "69442e00792d233b651e7830"

    const cart = await modelCart.findOne({user : userId , status: "active"})
    if(!cart) return res.status(404).json("Cart not found")

    const item = cart.items.find((i)=> i.product.toString() === productId)

    if(!item) return res.status(404).json("item not found")

     if(type === "increase"){
        item.quantity += 1
     }
     if (type === "decrease") {
         item.quantity -= 1;

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
            (i) => i.product.toString() !== productId
            );
  }
}
     


     cart.totalPrice = cart.items.reduce((sum ,i)=> sum + i.price * i.quantity,0)
     
     await cart.save()

     return res.status(200).json({
        message:"successful cart",
        data : cart
      })
   } catch (error) {
       return res.status(500).json({message:"Errror",err : error.message})
   }
}