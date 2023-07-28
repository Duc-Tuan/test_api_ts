const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const ProductSchema = new Schema(
  {
    productName: { type: String, length: 255 },
    price: { type: Number, require: true, length: 15 },
    quantity: { type: Number, require: true, length: 15 },
    status: { type: String, default: 'STOCKING', length: 35 },
    productImage: {
      type: String,
      default: null,
    },
    productImageDetail: [
      {
        type: String,
        default: null,
      },
    ],
    productImageMulter: [
      {
        type: String,
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Products = mongodb.model('Product', ProductSchema);
module.exports = Products;
