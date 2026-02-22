const products = require('../models/products')

async function createProduct(data) {
  try {
    const product = await products.create(data);

    if(product.quantity > 2) product.status = "InStock";
    else if(product.quantity === 0) product.status = "OutOfStock";
    else if(product.quantity < 2) product.status = "LowStock";

    return { message: "Product created successfully", product };
  } catch (err) {
    if (err.code === 11000) {
      throw { status: 409, message: "Product name already exists" };
    }
    throw { status: 400, message: err.message };
  }
}

async function updateProduct(productId, data) {
  try {
    const product = await products.findById(productId);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (data.name !== undefined) product.name = data.name;
    if (data.status !== undefined) product.status = data.status;
    if (data.categories !== undefined) product.categories = data.categories;

    await product.save();
    return { message: "Product updated successfully", product };
  } catch (err) {
    if (err.status) throw err;
    if (err.code === 11000) {
      throw { status: 409, message: "Product name already exists" };
    }
    throw { status: 400, message: err.message };
  }
}

async function getUserProducts(ownerId) {
  try {
    const prod = await products.find({ owner: ownerId });
    return prod;
  } catch (err) {
    throw { status: 500, message: err.message };
  }
}

async function deleteProduct(productId) {
  try {
    const product = await products.findByIdAndDelete(productId);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    return { message: "Product deleted successfully" };
  } catch (err) {
    if (err.status) throw err;
    throw { status: 500, message: err.message };
  }
}

async function updateStock(productId, operation, quantity) {
  try {
    if (!["restock", "destock"].includes(operation)) {
      throw { status: 400, message: "Invalid operation. Must be 'restock' or 'destock'" };
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw { status: 400, message: "Quantity must be a positive integer" };
    }

    const product = await products.findById(productId);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    if (operation === "restock") {
      product.quantity += quantity;
    }

    if (operation === "destock") {
      if (product.quantity < quantity) {
        throw { status: 400, message: "Insufficient stock for destock operation" };
      }
      product.quantity -= quantity;
    }

    await product.save();
    return { message: "Stock updated successfully", product };
  } catch (err) {
    if (err.status) throw err;
    throw { status: 500, message: err.message };
  }
}

async function getProducts(query){
  const {limit=10, skip=0, status} = query;
  const filter = {};
  if(status) filter.status = status;
  const prods = await products.find(filter).limit(Number(limit)).skip(Number(skip)).lean();
  return prods;
}

module.exports = {
    createProduct,
    getProducts,
    getUserProducts,
    updateProduct,
    deleteProduct,
    updateStock
}