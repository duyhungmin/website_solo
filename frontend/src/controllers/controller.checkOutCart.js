import ModelCheckOutCart from "../models/model.cartCheckOut";
import ModelCart from "../models/model.cart";

export const createOder = async (req,res)=>{

   try {
     const userId = req.userId
    //  console.log(userId)
    const {shippingAddress, paymentMethod = "cod"} = req.body

    const cart = await ModelCart.findOne({user : userId, status:"active"})
    if(!cart || cart.items.length === 0){
        return res.status(404).json({message :"Cart is empty"})
    }

    const oder = await ModelCheckOutCart.create({
        user : userId,
        items : cart.items,
        totalPrice : cart.totalPrice,
        shippingAddress,
        paymentMethod
    })

    console.log(oder)
    // clear cart sau khi tạo oder ? 

    cart.items = []
    cart.totalPrice = 0
    cart.status = "odered";
    await cart.save()
    
    res.status(201).json({
        message:"Oder successfully",
        data : oder
    })

   } catch (error) {
    console.error(error);
        res.status(500).json({ message: "Server error" });
   }
   
}

export const getOderDetails = async (req,res)=>{
   try {
     const userId = req.userId
    const {id} = req.params

    const productDetail = await ModelCheckOutCart.findOne({

        _id : id,
        user : userId

    })

    if(!productDetail){
        return res.status(404).json({message :"Oder not found"})
    }

    return res.status(200).json({
        message: "Hiển thị chi tiết đơn hàng thành công",
        data : productDetail
    })
   } catch (error) {
    return res.status(500).json({message:"Lỗi", error})
   }
}