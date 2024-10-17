import express from "express";
import { BEAST } from "../controllers/BeastCon";
import { upload } from "../middleware/Multer";

export const beastRt: express.Router = express.Router();
    beastRt.post("/", upload.single("image"), BEAST.Create);
    beastRt.get("/", BEAST.FetchAll);
    beastRt.get("/:id", BEAST.GetOne);
    beastRt.put("/:id", upload.single("image"), BEAST.Update);
    // beastRt.delete("/:id", );
    
    
    
    
    
    



    