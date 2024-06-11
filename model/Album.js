import mongoose from "mongoose";

export const Album = mongoose.model(
  "Album",
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
      type: String,
      default: ''
    },
    releaseDate: {
      type: Date
    },
    tracks: {
      type: Object,
      required: true
    },
    links: {
      type: Object
    }
  })
);
