const process = require('node:process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

    role:{
      type: String,
      enum: ["admin", "user"],
      optional: true
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },

    dob: {
      type: Date,
      optional: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function () {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = bcrypt.hashSync(this.password, 10);
  } catch (err) {
  }
});

userSchema.set('toJSON', {
  transform: (doc, { __v, password, ...rest }, options) => rest
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const JWT_SECRET = process.env.JWT_SECRET || 'hjfytfsayr57623er623dfsss3d6723ert623dr';

userSchema.methods.generateJwt = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('User', userSchema);