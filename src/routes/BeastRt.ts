import express from "express";
import { IndexHome } from "../controllers/BeastCon";

export const beastRt: express.Router = express.Router();
    beastRt.get("/", IndexHome);


