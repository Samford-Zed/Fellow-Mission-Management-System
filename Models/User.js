import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'participant'], default: 'participant' },
  phone:{type:String,required:true},
  isAccountVerified:{type:Boolean,default:true},
  createdAt: { type: Date, default: Date.now },
});

const UserModel=mongoose.models.user || mongoose.model("User",UserSchema);

export default UserModel;