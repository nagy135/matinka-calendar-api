import {Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";

import {User} from "./User";
import {Record} from "./Record";

@Entity()
export class Attendant {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn()
    userId!: number;

    @OneToOne(() => Record)
    @JoinColumn()
    recordId!: number;
}
