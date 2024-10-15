import "reflect-metadata";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { trim } from "./middleware/trim";
import { ERR } from "./middleware/midError";
import { beastRt } from "./routes/BeastRt";
import { v2 as cloudinary } from "cloudinary";
import { dBase } from "./data/database";

(async () => {
    await dBase.initialize()
    .then(() => console.log("PostgreSQL is now Connected!"))
    .catch((error) => console.log(error));
    const app: express.Application = express();
    app.use(helmet());

    // CORS Setup
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            res.status(200).json({ "status message": "OK" });
        };
        next();
    });

    // Cloudinary Connection
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_API_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(logger("dev"));
    app.use(trim);
    app.use("/api/beast", beastRt);
    app.use(ERR.notFound);
    app.use(ERR.errHandler);
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    });
})();



