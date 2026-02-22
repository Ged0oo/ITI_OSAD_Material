const User = require('../models/users')

async function createUser(data) {
  try {
    const user = await User.create(data);
    const jwt = user.generateJwt();
    return { message: "User created successfully", user, jwt };
  } catch (err) {
    if (err.code === 11000) throw { status: 409, message: "Username already exists" };
    throw { status: 400, message: err.message };
  }
}

async function login(data) {
  try {
    const user = await User.findOne({ username: data.username }).exec();
    
    if (!user) {
      throw { status: 401, message: "Invalid username or password" };
    }

    const isValid = user.verifyPassword(data.password);
    
    if (!isValid) {
      throw { status: 401, message: "Invalid username or password" };
    }

    const jwt = user.generateJwt();
    return { message: "Login successful", user, jwt };
  } catch (err) {
    if (err.status) throw err;
    throw { status: 500, message: err.message };
  }
}

async function getUsers() {
  try {
    const retUsers = await User.find({}, "firstName username");
    return retUsers;
  } catch (err) {
    throw { status: 500, message: err.message };
  }
}

async function deleteUser(userId) {
  try {
    const user = await User.findByIdAndDelete(userId);
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
    const user = await User.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (data.username !== undefined) user.username = data.username;
    if (data.firstName !== undefined) user.firstName = data.firstName;
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
  login,
  getUsers,
  deleteUser,
  updateUser
}