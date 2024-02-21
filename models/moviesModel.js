import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  year: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "producers",
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actors",
      required: true,
    },
  ],
});

const moviesmodel = mongoose.model("movies", movieSchema);
export default moviesmodel;
