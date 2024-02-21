import express from "express";
import {
  addActor,
  getActors,
  searchActors,
  editActor,
} from "../controllers/actorController.js";
const router = express.Router();

router.post("/addactor", addActor);
router.get("/getactors", getActors);
router.get("/searchActor", searchActors);
router.put("/editactor/:id", editActor);

export default router;
