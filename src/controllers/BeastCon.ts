import express from "express";

export const IndexHome: express.Handler = 
(req, res) => {
    res.json({ BEAST: "TypeORM and Cloudinary!" })
};


