import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createFarm, deleteFarm, getAllFarm, getFarmsByUser, updateFarm } from "../controllers/farmController"


const farmRouter = Router();


farmRouter.post("/create", authenticateToken, createFarm);
farmRouter.get("/", getAllFarm);
farmRouter.put("/:id", authenticateToken, updateFarm);
farmRouter.delete("/:id", authenticateToken, deleteFarm);
farmRouter.get("/user", authenticateToken, getFarmsByUser);


export default farmRouter;