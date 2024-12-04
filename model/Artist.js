import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    quote: {
      type: String
    },
    profileImage: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    },
    signedDate: {
      type: Date
    },
    biography: {
      type: String
      // required: true
    }
  })

artistSchema.pre('save', function (next) {
  console.log("Saving artisit in progress...")
  next()
})

export const Artist = mongoose.model( "Artist", artistSchema );