const Product = require('../models/products')

function calculateStatus(quantity) {
  if (quantity > 2) return "available";
  if (quantity > 0) return "low stock";
  return "out of stock";
}

async function createProduct(data) {
  try {
    const role = data.role;
    req.role = "admin";
    const product = await Product.create(data);
    product.status = calculateStatus(product.quantity);
    await product.save();
    return { message: "Product created successfully", product };
  } catch (err) {
    if (err.code === 11000) {
      throw { status: 409, message: "Product name already exists for this user" };
    }
    throw { status: 400, message: err.message };
  }
}

async function updateProduct(productId, data) {
  try {
    const product = await Product.findById(productId);
    if (!product) throw { status: 404, message: "Product not found" };

    if (data.name !== undefined) product.name = data.name;
    if (data.quantity !== undefined) {
      product.quantity = data.quantity;
      product.status = calculateStatus(product.quantity);
    }
    if (data.category !== undefined) product.category = data.category;

    await product.save();
    return { message: "Product updated successfully", product };
  } catch (err) {
    if (err.status) throw err;
    if (err.code === 11000) {
      throw { status: 409, message: "Product name already exists for this user" };
    }
    throw { status: 400, message: err.message };
  }
}

async function getUserProducts(ownerId) {
  try {
    const prod = await Product.find({ owner: ownerId });
    prod.forEach(p => {
      p.status = calculateStatus(p.quantity);
    });
    return prod;
  } catch (err) {
    throw { status: 500, message: err.message };
  }
}

async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
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

    const product = await Product.findById(productId);
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

    product.status = calculateStatus(product.quantity);
    await product.save();
    return { message: "Stock updated successfully", product };
  } catch (err) {
    if (err.status) throw err;
    throw { status: 500, message: err.message };
  }
}

async function getProducts(query, userId = null){
  try {
    const {limit=10, skip=0, status} = query;
    const filter = {};
    if(status) filter.status = status;
    if(userId) filter.owner = userId;
    
    const prods = await Product.find(filter).limit(Number(limit)).skip(Number(skip)).lean();
    
    prods.forEach(p => {
      p.status = calculateStatus(p.quantity);
    });
    
    return prods;
  } catch (err) {
    throw { status: 500, message: err.message };
  }
}

module.exports = {
    createProduct,
    getProducts,
    getUserProducts,
    updateProduct,
    deleteProduct,
    updateStock
}