import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  isFired: { type: Boolean, default: false },
  name: { type: String, required: [true, 'name is required'] },
  photo: { type: String, required: [true, 'photo is required'] },
  email: { type: String, required: [true, 'email is required'] },
  phone: { type: String, required: [true, 'phone is required'] },
  dob: { type: String, required: [true, 'birthDate is required'] },
  address: { type: String, required: [true, 'address is required'] },
  salary: { type: String, required: [true, 'salary is required'] },
  employmentDate: { type: String, required: [true, 'employmentDate is required'] },
  depertmentId: { type: Schema.Types.ObjectId, ref: 'Depertments' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Employees', EmployeeSchema);
