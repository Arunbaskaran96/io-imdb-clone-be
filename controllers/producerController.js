import producermodel from "../models/producerModel.js";

export const addProducer = async (req, res, next) => {
  try {
    const { name, pic, bio, dob, gender } = req.body;
    const newProducer = new producermodel({
      name,
      bio,
      gender,
      pic,
      dob,
    });
    await newProducer.save();
    res.status(200).json(newProducer);
  } catch (error) {
    next(error);
  }
};

export const gerPoducers = async (req, res, next) => {
  try {
    const producers = await producermodel.find().populate("movies");
    res.status(200).json(producers);
  } catch (error) {
    next(error);
  }
};

export const searchProducer = async (req, res, next) => {
  try {
    const { name } = req.query;
    const producer = await producermodel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(producer);
  } catch (error) {
    next(error);
  }
};

export const editProducer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProducer = await producermodel.findById(req.params.id);
    if (updatedProducer) {
      await producermodel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProducer);
    }
  } catch (error) {
    next(error);
  }
};
