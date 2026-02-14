const users = require('../models/users')

async function createUser(data) {
  try {
    const user = await users.create(data);
    return { message: "User created successfully", user };
  } catch (err) {
    if (err.code === 11000) {
      throw { status: 409, message: "Username already exists" };
    }
    throw { status: 400, message: err.message };
  }
}

async function getUsers() {
  try {
    const retUsers = await users.find({}, "firstName");
    return retUsers.map(user => user.firstName);
  } catch (err) {
    throw { status: 500, message: err.message };
  }
}

async function deleteUser(userId) {
  try {
    const user = await users.findByIdAndDelete(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return { message: "User deleted successfully" };
  } catch (err) {
    if (err.status) throw err;
    throw { status: 500, message: err.message };
  }
}

async function updateUser(userId, data) {
  try {
    const user = await users.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (data.username !== undefined) user.username = data.username;
    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.dob !== undefined) user.dob = data.dob;

    await user.save();
    return { message: "User updated successfully", user };
  } catch (err) {
    if (err.status) throw err;
    if (err.code === 11000) {
      throw { status: 409, message: "Username already exists" };
    }
    throw { status: 400, message: err.message };
  }
}


module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser
}