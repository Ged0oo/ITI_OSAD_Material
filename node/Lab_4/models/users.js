const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [8, "Username must be at least 8 characters"],
      trim: true
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [15, "First name must be at most 15 characters"],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [15, "Last name must be at most 15 characters"],
      trim: true
    },

    dob: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);