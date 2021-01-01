import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Attendant } from "../entity/Attendant";

@Entity()
export class Record {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: Date;

    @Column()
    time!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @OneToMany(() => Attendant, attendant => attendant.record)
    attendants!: Attendant[];

}
