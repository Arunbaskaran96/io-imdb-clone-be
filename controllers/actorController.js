import actormodel from "../models/actormodel.js";

export const addActor = async (req, res, next) => {
  try {
    const { name, dob, gender, bio, pic } = req.body;
    const newActor = new actormodel({
      name,
      gender,
      bio,
      dob,
      pic,
    });
    await newActor.save();
    res.status(200).json(newActor);
  } catch (error) {
    next(error);
  }
};

export const getActors = async (req, res, next) => {
  try {
    const actors = await actormodel.find().populate("movies");
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

export const searchActors = async (req, res, next) => {
  try {
    const { name } = req.query;
    const actors = await actormodel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(actors);
  } catch (error) {
    next(error);
  }
};

export const editActor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const actor = await actormodel.findById(id);
    if (actor) {
      const updatedActor = await actormodel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
    }
    res.status(200).json(actor);
  } catch (error) {
    next(error);
  }
};
