const products = require('../models/products')

function createProduct(data) {
    return products.create(data);
}

async function updateProduct(productId, data) {
  try {
    const product = await products.findById(productId);
    if (!product) return { message: "Product not found" };

    if (data.name !== undefined) product.name = data.name;
    if (data.categories !== undefined) product.categories = data.categories;

    await product.save();
    return { message: "Product updated successfully", product };
  } catch (err) {
    throw err;
  }
}

async function getUserProducts(ownerId) {
  try {
    const prod = await products.find({ owner: ownerId });
    return prod;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(productId) {
  try {
    const product = await products.findByIdAndDelete(productId);
    if (!product) return { message: "Product not found" };
    return { message: "Product deleted successfully" };
  } catch (err) {
    throw err;
  }
}

async function updateStock(productId, operation, quantity){
    if (!["restock", "destock"].includes(operation)) {
      return res.status(400).json({ message: "Invalid operation" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be positive integer" });
    }

    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (operation === "restock") product.quantity += quantity;

    if (operation === "destock") {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      product.quantity -= quantity;
    }

    await product.save();
}

module.exports = {
    createProduct,
    getUserProducts,
    updateProduct,
    deleteProduct,
    updateStock
}