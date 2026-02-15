const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"]
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      minlength: [5, "Name must be at least 5 characters"],
      maxlength: [20, "Name must be at most 20 characters"],
      trim: true
    },

    quantity: {
      type: Number,
      required: [true, "Product Quantity is required"],
      min: [0, "Product Quantity must be a positive value"]
    },

    status: {
      type: String
    },

    categories: {
      type: [String],
      default: ["General"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
