import express from 'express';
import dotenv from 'dotenv';
import routerProduct from "./routes/product.route"  
import routerUser from "./routes/user.route"
import routerCart from "./routes/cart.route"
import routerOder from "./routes/checkout.route" 
import cors from 'cors';
// dotenv.config();
import moongoose from 'mongoose';



moongoose.connect('mongodb://localhost:27017/db_project')
.then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB connection error:", err));


const app = express();

// const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/users', routerUser);
app.use('/products', routerProduct);
app.use('/cart',routerCart)
app.use('/check-out',routerOder)

