
// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
  work: { type: String, trim: false },
  role: { type: String, default: 'user' },
  add: { type: String },
  status: { type: String, required: [false, "Status is Required"], enum: ['Active', 'InActive'], default: 'Active' },
  desc: { type: String, required: false },
  datecreated: Date,
  dateUpdated: Date
}, {
  collection: 'users',
  versionKey: false,
  timestamps: true
});

const userModel = mongoose.model('users', userSchema);

export default userModel;