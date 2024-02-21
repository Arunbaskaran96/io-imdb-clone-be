import express from "express";
import {
  addProducer,
  editProducer,
  gerPoducers,
  searchProducer,
} from "../controllers/producerController.js";
const router = express.Router();

router.post("/addProducer", addProducer);
router.get("/getProducers", gerPoducers);
router.get("/searchProducer", searchProducer);
router.put("/editproducer/:id", editProducer);

export default router;
