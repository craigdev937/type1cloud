import "dotenv/config";
import { DataSource } from "typeorm";

const rootDir = process.env.NODE_ENV === "development" ?
    "src" : "dist";

    export const dBase: DataSource = new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: [`${rootDir}/models/**/*.{ts,js}`],
        migrations: [`${rootDir}/migrations/**/*.{ts,js}`]
    });



