import mongoose from "mongoose";    


const collectedDataSchema = new mongoose.Schema({
  groupId: { type:String, required: true },
  collectedBy: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Collected_Data = mongoose.model('CollectedData', collectedDataSchema);

export default Collected_Data;
