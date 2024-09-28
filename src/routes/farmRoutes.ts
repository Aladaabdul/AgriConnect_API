import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createFarm, deleteFarm, getAllFarm, updateFarm } from "../controllers/farmController"


const farmRouter = Router();


farmRouter.post("/create", authenticateToken, createFarm);
farmRouter.get("/", getAllFarm);
farmRouter.put("/:id", authenticateToken, updateFarm);
farmRouter.delete("/:id", authenticateToken, deleteFarm);


export default farmRouter;