import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js'
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post('/' , isAuth , expressAsyncHandler(async (req,res) => {
    console.log(req.user.user._id)
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user.user._id,
      });
    const order =await newOrder.save();
    res.status(201).send({ message : 'new order created' , order})
}))

export default orderRouter;