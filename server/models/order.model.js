import mongoose from 'mongoose'
const CartItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  quantity: Number,
  shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
  status: {type: String,
    default: 'Not processed',
    enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']}
})
const CartItem = mongoose.model('CartItem', CartItemSchema)

// const OrderSchema = new mongoose.Schema({
//   products: [CartItemSchema],
//   customer_name: {
//     type: String,
//     trim: true,
//     required: 'Name is required'
//   },
//   customer_email: {
//     type: String,
//     trim: true,
//     match: [/.+\@.+\..+/, 'Please fill a valid email address'],
//     required: 'Email is required'
//   },
//   delivery_address: {
//     street: {type: String, required: 'Street is required'},
//     city: {type: String, required: 'City is required'},
//     state: {type: String},
//     zipcode: {type: String, required: 'Zip Code is required'},
//     country: {type: String, required: 'Country is required'}
//   },
//   payment_id: {},
//   updated: Date,
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   user: {type: mongoose.Schema.ObjectId, ref: 'User'}
// })


//
const OrderSchema = mongoose.Schema(
  {
    payment_method: {
      type: String,
      required: true,
      default: "esewa",
    },
    transaction_code: String,
    amount: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: String,
          required: true,
          default: "Test",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["created", "paid", "shipping", "delivered"],
      default: "created",
    },
    address: String,
  },
  {
    timestamps: true,
  }
);
//

const Order = mongoose.model('Order', OrderSchema)

export {Order, CartItem}
