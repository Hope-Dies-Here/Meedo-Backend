import mongoose from "mongoose";

export const Artist = mongoose.model(
  "Artist",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
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
);
