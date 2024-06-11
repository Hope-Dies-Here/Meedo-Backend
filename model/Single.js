import mongoose from "mongoose";

export const Single = mongoose.model(
  "Single",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
    },
    featured: {
      type: String
    },
    releaseDate: {
      type: Date
    },
    links: {
      type: Array
    }
  })
);
