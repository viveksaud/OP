import {Order, CartItem} from '../models/order.model'
import errorHandler from './../helpers/dbErrorHandler'


const orderService = require("../services/order_services");
const axios = require("axios");
const crypto = require("crypto");
const { callKhalti } = require("../controllers/khalti_controller");


const create = async (req, res) => {
  try {
    req.body.order.user = req.profile
    let order = new Order(req.body.order)
    let result = await order.save()
    res.status(200).json(result)

  } catch (err){
    return res.status(400).json({ errorAAA: err?.message || "No Orders found" });
  }
}

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.save(req.body);
    const signature = this.createSignature(
      `total_amount=${order.amount},transaction_uuid=${order._id},product_code=EPAYTEST`
    );
    if (order.payment_method === "esewa") {
      const formData = {
        amount: order.amount,
        failure_url: "http://localhost:3000",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/api/esewa/success",
        tax_amount: "0",
        total_amount: order.amount,
        transaction_uuid: order._id,
      };
      res.json({
        message: "Order Created Sucessfully",
        order,
        payment_method: "esewa",
        formData,
      });
    } else if (order.payment_method === "khalti") {
      const formData = {
        return_url: "http://localhost:3000/api/khalti/callback",
        website_url: "http://localhost:3000",
        amount: order.amount * 100, //paisa
        purchase_order_id: order._id,
        purchase_order_name: "test",
      };

      callKhalti(formData, req, res);
    }
  } catch (err) {
    return res.status(400).json({ errorBBB: err?.message || "No Orders found" });
  }
};

exports.updateOrderAfterPayment = async (req, res, next) => {
  try {
    const order = await orderService.findById(req.transaction_uuid);
    order.status = "paid";
    order.transaction_code = req.transaction_code;

    await orderService.save(order);
    res.redirect("http://localhost:3000");
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q"; //different in production
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};





const listByShop = async (req, res) => {
  try {
    let orders = await Order.find({"products.shop": req.shop._id})
      .populate({path: 'products.product', select: '_id name price'})
      .sort('-created')
      .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  try {
    let order = await Order.updateOne({'products._id':req.body.cartItemId}, {
        'products.$.status': req.body.status
    })
      res.json(order)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const getStatusValues = (req, res) => {
  res.json(CartItem.schema.path('status').enumValues)
}

const orderByID = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id)
      
    // let order = await Order.findById(id)
    //   .populate("products.product", "name price")
    //   .populate("products.shop", "name")
    //   .exec();
    if (!order)
      return res.status('400').json({
        error: "Order not found"
      })
    req.order = order
    next()
  } catch (err){
    return res.status(400).json({
      error111: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let orders = await Order.find({ "user": req.profile._id })
        .sort('-created')
        .exec()
    res.json(orders)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = (req, res) => {
  return res.json(req.order)
}

export default {
  create,
  listByShop,
  update,
  getStatusValues,
  orderByID,
  listByUser,
  read
}
