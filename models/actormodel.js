import mongoose from "mongoose";

const actorschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  dob: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
  ],
});

const actormodel = mongoose.model("actors", actorschema);
export default actormodel;
