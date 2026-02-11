const fs = require('fs');
const path = require('path');

const invPath = path.join(__dirname, 'inventory.json');

if (!fs.existsSync(invPath)) {
  fs.writeFileSync(invPath, JSON.stringify([]));
}

const inv = JSON.parse(fs.readFileSync(invPath, 'utf-8'));

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

function idValidation(req, res, next) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  if (id <= 0) {
    return res.status(400).json({ message: "ID must be positive." });
  }

  next();
}

function destockValidation(req, res, next) {
  const { destock } = req.body;

  if (isNaN(destock)) {
    return res.status(400).json({ message: "Invalid Destock." });
  }

  if (destock <= 0) {
    return res.status(400).json({ message: "Destock must be positive." });
  }

  next();
}

function restockValidation(req, res, next) {
  const { restock } = req.body;

  if (isNaN(restock)) {
    return res.status(400).json({ message: "Invalid Restock." });
  }

  if (restock <= 0) {
    return res.status(400).json({ message: "Restock must be positive." });
  }

  next();
}

function newItemValidation(req, res, next) {
  const { name, quantity, category } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be a string"
      });
    }
  } else { res.status(400).json({ message: "Invalid Item" }); return };

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length < 2) {
      return res.status(400).json({
        message: "Category must be a valid string."
      });
    }
  } else { res.status(400).json({ message: "Invalid Item" }); return };

  if (quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer."
      });
    }
  } else { res.status(400).json({ message: "Invalid Item" }); return };

  next();
}

function newProdValidation(req, res, next) {
  const { name, quantity, category } = req.body;

  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be a string"
      });
    }
  }

  if (category !== undefined) {
    if (typeof category !== "string" || category.trim().length < 2) {
      return res.status(400).json({
        message: "Category must be a valid string."
      });
    }
  }

  if (quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer."
      });
    }
  }

  next();
}

app.get("/", (req, res) => {
  res.render("index", {
    products: inv
  });
});


app.get("/products", (req, res) => {
  res.json(inv);
});

app.get("/products/:id", idValidation, (req, res) => {
  const id = Number(req.params.id);
  const prod = inv.find(i => i.id === id);

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(prod);
});

app.post("/products", newItemValidation, (req, res) => {
  const prod = req.body;
  add_item(prod);
  res.json({
    message: "Product added successfully",
    product: prod
  });
});

app.delete("/products/:id", idValidation, (req, res) => {
  const id = req.productId;
  remove_item(id);
  res.json(inv);
});

app.patch("/products/:id", idValidation, newProdValidation, (req, res) => {
  const id = Number(req.params.id);
  const prod = inv.find(i => i.id === id);

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, quantity, category } = req.body;

  if (name !== undefined) prod.name = name;
  if (quantity !== undefined) prod.quantity = quantity;
  if (category !== undefined) prod.category = category;

  saveInventory(inv);

  res.json({
    message: "Product updated successfully",
    product: prod
  });
});

app.patch("/products/restock/:id", idValidation, restockValidation, (req, res) => {
  const id = Number(req.params.id);
  const prod = inv.find(i => i.id === id);

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }

  prod.quantity += req.restockAmount

  saveInventory(inv);

  res.json({
    message: "Product updated successfully",
    product: prod
  });
});

app.patch("/products/destock/:id", idValidation, destockValidation, (req, res) => {
  const id = Number(req.params.id);
  const prod = inv.find(i => i.id === id);

  if (!prod) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (prod.quantity < req.destockAmount) {
    return res.status(400).json({ message: "Invalid Destock." });
  }

  prod.quantity -= req.destockAmount
  saveInventory(inv);

  res.json({
    message: "Product updated successfully",
    product: prod
  });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

function add_item(prod) {
  inv.push(prod);
  saveInventory(inv);
  console.log(`Added item: ${prod.name}`);
}

function saveInventory(data) {
  fs.writeFileSync(invPath, JSON.stringify(data));
}

function remove_item(item_id) {
  const idx = inv.findIndex(i => i.id === item_id);
  if (idx === -1) return console.log("Item not found");
  const rem = inv.splice(idx, 1)[0];
  fs.writeFileSync(invPath, JSON.stringify(inv));
  console.log(`Element ${item_id} has been Removed.`);
}