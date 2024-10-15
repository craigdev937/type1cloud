import { BaseEntity, Column, Entity, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "beasts"})
export class Beast extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() beastName: string;
    @Column() info: string;
    @Column() image: string;
    @Column() cloudinary_id: string;
};



