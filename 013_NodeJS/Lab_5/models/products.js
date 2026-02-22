const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Owner is required"]
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
      trim: true
    },

    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
      min: [0, "Product Quantity must be a non-negative value"],
      default: 0
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },

    status: {
      type: String,
      enum: ["available", "low stock", "out of stock"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ owner: 1, name: 1 }, { unique: true });
module.exports = mongoose.model("Product", productSchema);
