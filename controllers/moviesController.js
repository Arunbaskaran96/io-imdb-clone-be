import actormodel from "../models/actormodel.js";
import moviesmodel from "../models/moviesModel.js";
import producermodel from "../models/producerModel.js";

export const addMovie = async (req, res, next) => {
  try {
    const { name, year, plot, producer, actors, poster } = req.body;
    const newMovie = new moviesmodel({
      name,
      year,
      plot,
      producer,
      actors,
      poster,
    });
    await newMovie.save();
    const findActors = await Promise.all(
      newMovie.actors.map((actorId) => {
        return actormodel.findById(actorId);
      })
    );
    const updateActorsMovieList = await Promise.all(
      findActors.map((actor) => {
        return actor.updateOne({ $push: { movies: newMovie._id } });
      })
    );
    const findProducer = await producermodel.findById(newMovie.producer);
    if (findProducer) {
      await findProducer.updateOne({ $push: { movies: newMovie._id } });
    }

    res.status(200).json(newMovie);
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const movies = await moviesmodel
      .find({})
      .populate("producer", "-movies")
      .populate("actors");
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const editMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await moviesmodel.findById(id);

    if (movie) {
      const findProducer = await producermodel.findById(movie.producer);
      await findProducer.updateOne({ $pull: { movies: movie._id } });
      const findActors = await Promise.all(
        movie.actors.map((actor) => {
          return actormodel.findById(actor);
        })
      );
      const removeMovie = await Promise.all(
        findActors.map((item) => {
          return item.updateOne({ $pull: { movies: movie._id } });
        })
      );

      const updatedMovie = await moviesmodel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const updateFindActor = await Promise.all(
        updatedMovie.actors.map((actor) => {
          return actormodel.findById(actor);
        })
      );
      const updatedFindActor = await Promise.all(
        updateFindActor.map((item) => {
          return item.updateOne({ $push: { movies: updatedMovie._id } });
        })
      );
      const updatedProducer = await producermodel.findById(
        updatedMovie.producer
      );
      await updatedProducer.updateOne({ $push: { movies: updatedMovie._id } });
      res.status(200).json(updatedMovie);
    }
  } catch (error) {
    next(error);
  }
};
