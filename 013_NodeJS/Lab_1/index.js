const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const invPath = path.join(__dirname, 'inventory.json');

if (!fs.existsSync(invPath)) {
    fs.writeFileSync(invPath, JSON.stringify([]));
}

const inv = JSON.parse(fs.readFileSync(invPath, 'utf-8'));

function saveInventory(data) {
    fs.writeFileSync(invPath, JSON.stringify(data));
}

function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

function isPositiveNumber(num) {
    return Number.isInteger(num) && num > 0;
}

function add_item(name) {
    if (!isValidName(name)) {
        return console.log("Error: Name must contain only alphabetic characters");
    }
    const id = inv.length>0 ? inv[inv.length - 1].id + 1 : 1;
    const newItem = {id, name, quantity: 1, category: "General"};
    inv.push(newItem);
    saveInventory(inv);
    console.log(`Added item: ${name}`);
}

function destock_item(item_id, quantity) {
    if (!isPositiveNumber(quantity)) {
        return console.log("Error: Quantity must be a positive number");
    }
    const item = inv.find(i => i.id === item_id);
    if (!item) return console.log("Item not found");

    if(item.quantity - quantity >= 0){
        item.quantity -= quantity;
        saveInventory(inv);
        console.log(`Destocked ${quantity} from item number ${item_id}`);
    } else {
        console.log(`Limited Quantuty`);
    }
}

function restock_item(item_id, quantity) {
    if (!isPositiveNumber(quantity)) {
        return console.log("Error: Quantity must be a positive number");
    }
    const item = inv.find(i => i.id === item_id);
    if (!item) return console.log("Item not found");
    item.quantity += quantity;
    saveInventory(inv);
    console.log(`Restocked ${quantity} to ${item_id}`);
}

function edit_item(item_id, new_name){
    if (!isValidName(new_name)) {
        return console.log("Error: Name must contain only alphabetic characters");
    }
    const item = inv.find(i => i.id === item_id);
    if (!item) return console.log("Item not found");
    item.name = new_name;
    saveInventory(inv);
    console.log(`Update Element ${item_id} with ${new_name}`);
}

function list_items() {
    inv.forEach(i => {
        if (i.quantity > 2) console.log(`${i.name} is Available`);
        else if (i.quantity > 0) console.log(`${i.name} is Low Stock`);
        else console.log(`${i.name} is Out of Stock`);
    });
}

function remove_item(item_id){
    const idx = inv.findIndex(i => i.id === item_id);
    if (idx === -1) return console.log("Item not found");
    const rem = inv.splice(idx, 1)[0];
    fs.writeFileSync(invPath, JSON.stringify(inv));
    console.log(`Element ${item_id} has been Removed.`);
}

function get_summary() {
    let total_items = 0, total_quantity = 0, available = 0, low = 0, out = 0;
    inv.forEach(i => {
        total_items++;
        total_quantity += i.quantity;
        if (i.quantity > 2) available++;
        else if (i.quantity > 0) low++;
        else out++;
    });

    console.log("Inventory Summary:");
    console.log(`Total items: ${total_items}`);
    console.log(`Total quantity: ${total_quantity}`);
    console.log(`Available: ${available}`);
    console.log(`Low stock: ${low}`);
    console.log(`Out of stock: ${out}`);
}

if (command === "add") add_item(process.argv[3]);
else if (command === "delete") remove_item(Number(process.argv[3]));
else if (command === "edit") edit_item(Number(process.argv[3]), process.argv[4]);
else if (command === "destock") destock_item(Number(process.argv[3]), Number(process.argv[4]));
else if (command === "restock") restock_item(Number(process.argv[3]), Number(process.argv[4]));
else if (command === "list") list_items();
else if (command === "summary") get_summary();
else console.log("Unknown command");
