import {Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column} from "typeorm";

import {Record} from "./Record";

@Entity()
export class Attendant {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ nullable: true })
    email!: string;

    @OneToOne(() => Record)
    @JoinColumn()
    record!: Record;
}
