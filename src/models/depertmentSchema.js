import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const DepertmentSchema = new Schema({
  depertmentName: { type: String, required: [true, 'depertmentName is required'] },
  depertmentChief: { type: String, required: [true, 'depertmentChief is required'] },
  depertmentPositions: { type: String, required: [true, 'depertmentPositions is required'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Depertments', DepertmentSchema);
