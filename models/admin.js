// models/admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

adminSchema.pre('save', async function (next) {
  const admin = this;
  if (!admin.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admin.password, salt);
  admin.password = hashedPassword;
  next();
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
