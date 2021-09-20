import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 50,
    unique: true
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  profileImage: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    max: 100,
    default: '',
  },
  city: {
    type: String,
    max: 50,
    default: '',
  },
  from: {
    type: String,
    max: 50,
    default: '',
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3]
  }
},
{
  timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema);