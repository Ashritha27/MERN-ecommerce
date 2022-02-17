import express from 'express';
import data from '../data.js'
import Product from '../models/ProductModels.js'
import User from '../models/UserModels.js'


const seedRouter = express.Router();


seedRouter.get('/' , async(req,res) => {
    await Product.Remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.Remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers,createdUsers});
})

expot default seedRouter;