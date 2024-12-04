import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

adminSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    console.log('this')
    console.log(this)
  } catch (err) {
    next(err)
  }
})

export const Admin = mongoose.model("Admin", adminSchema)