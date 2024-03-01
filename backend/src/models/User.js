// backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {type: String, require: false,},
  maxscore: {type: Number, require: false,},
  rol: {type: String, require: false,}
});

const User = mongoose.model('User', userSchema);

export default User;
