import fs from "fs";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { Beast } from "../models/BeastModel";

class BeastClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const result = await cloudinary
                .uploader.upload(req.file!.path);
            const beast = Beast.create({
                beastName: req.body.beastName,
                info: req.body.info,
                image: result.secure_url,
                cloudinary_id: result.public_id
            });
            await beast.save();
            fs.unlinkSync(req.file!.path);
            res.status(res.statusCode).json(beast);
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const beasts = await Beast
            .createQueryBuilder()
            .select("beasts")
            .from(Beast, "beasts")
            .getMany()
            res.status(res.statusCode).json(beasts);
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const beast = await Beast.findOne({
                where: {
                    id: parseInt(req.params.id)
                }
            });
            res.status(res.statusCode).json(beast);
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            let oldIMG = await Beast.findOneBy({
                id: parseInt(req.params.id)
            });
            await cloudinary.uploader.destroy(oldIMG!.cloudinary_id);
            const newIMG = await cloudinary.uploader.upload(req.file!.path);
            const beastID = await Beast.findOneBy({
                id: parseInt(req.params.id)
            });
            const beast = Beast.merge(beastID!, {
                beastName: req.body.beastName,
                info: req.body.info,
                image: newIMG.secure_url,
                cloudinary_id: newIMG.public_id
            });
            await beast.save();
            fs.unlinkSync(req.file!.path);
            res.status(res.statusCode).json(beast);
        } catch (error) {
            res.status(res.statusCode)
            .json(res.statusMessage);
            next(error);
        }
    };
};

export const BEAST: BeastClass = new BeastClass();



