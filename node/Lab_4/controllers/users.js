const users = require('../models/users')

function createUser(data) {
  return users.create(data);
}

async function getUsers() {
  const retUsers = await users.find({}, "firstName");
  return retUsers.map(user => user.firstName);
}

async function deleteUser(userId) {
  try {
    const user = await users.findByIdAndDelete(userId);
    if (!user) return { message: "User not found" };
    return { message: "User deleted successfully" };
  } catch (err) {
    throw err;
  }
}

async function updateUser(userId, data) {
  try {
    const user = await users.findById(userId);
    if (!user) return { message: "User not found" };

    if (data.username !== undefined) user.username = data.username;
    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.dob !== undefined) user.dob = data.dob;

    await user.save();
    return { message: "User updated successfully", user };
  } catch (err) {
    throw err;
  }
}


module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser
}