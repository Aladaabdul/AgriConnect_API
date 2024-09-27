import { Router } from "express";
import { authenticateToken } from "../utils/auth";
import { createFarm, getAllFarm } from "../controllers/farmController"


const farmRouter = Router();


farmRouter.post("/create", authenticateToken, createFarm);
farmRouter.get("/", getAllFarm);


export default farmRouter;