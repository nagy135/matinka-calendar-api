import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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

}
