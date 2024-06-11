import mongoose from "mongoose";

export const VideoClip = mongoose.model(
  "VideoClip",
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
    },
    isNewSong: {
      // this checks if the clip is new or from the album
      type: Boolean,
      required: true,
    }
  })
);
