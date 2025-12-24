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

export const getAllOrder = async (req,res)=>{
    try {
        const userId = req.userId
        const order = await ModelCheckOutCart.find({user:userId}).sort({createdAt: -1})

        if(!order || order.length === 0){
            return res.status(404).json({message:"bạn chưa có đơn hàng nào"})
        }

         return res.status(200).json({
            message: "Lấy danh sách đơn hàng thành công",
            total: order.length,
            data: order
            });
    } catch (error) {
        return res.status(500).json({message:"ERRER IN ERR",error})
    }
}

export const updateOrderStatus = async (req,res)=>{

    try {
        const {id} = req.params
        console.log( "đây là ID ỏ update status",id)

        const {status} = req.body
        console.log("đây là STATUS ở update status",status)

        const allowStatus = ModelCheckOutCart.schema.path("status").enumValues
        console.log("trạng thái",allowStatus)

        if(!allowStatus.includes(status)){
            return res.status(400).json({message:"Invalid Status"})
        }



        const oder = await ModelCheckOutCart.findByIdAndUpdate(id,{status},{new:true})

        if(!oder){
            return res.status(404).json({message:"Oder not found"})
        }
        if(oder.status === "processing"){
              return res.status(400).json({
             message: "Đơn hàng đang giao, không thể thay đổi trạng thái"
      });
        }


        oder.status = status
        await oder.save()

        return res.status(201).json({
            message:"update status successfully",
            data: oder
        })
    } catch (error) {
        return res.status(500).json({message:"Lỗi",error})
    }


}

export const getAllOrderByAdmin = async(req,res)=>{
    try {

        const response = await ModelCheckOutCart.find().populate("user","name email").sort({createdAt : -1})

        console.log(response)

        return res.status(201).json({
            message:"Lấy orders admin done",
            // total: response.length,
            data: response
        })
    } catch (error) {
        return res.status(500).json({message:"LỖI K LẤY ĐƯỢC HẾT NÈ",error})
    }
}