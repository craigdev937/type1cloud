import express from "express";

export const trim: express.Handler = 
(req, res, next) => {
    Object.keys(req.body).forEach((key) => {
        if (typeof req.body[key] === "string") {
            req.body[key] = req.body[key].trim();
        };
    })
    next();
};


