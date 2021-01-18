import { Schema, model } from 'mongoose';

const user = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default model('User', user);
