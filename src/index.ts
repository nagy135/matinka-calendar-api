import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Server} from "typescript-rest";

import {createConnection} from "typeorm";
import { User } from "./entity/User";
import { Record } from "./entity/Record";
import { Attendant } from "./entity/Attendant";

import './handlers';

createConnection({
    "type": "postgres",
    "host": "database",
    "port": 5432,
    "username": "postgres",
    "password": "password",
    "database": "matinka",
    "entities": [
        User,
        Record,
        Attendant
    ],
    "logging": true,
    "synchronize": true
}).then(connection => {
    const app: express.Application = express();

    app.use(cors());
    app.use(bodyParser.json());

    Server.buildServices(app);

    let port = parseInt(process.env.PORT || "");
    if (isNaN(port) || port === 0) {
        port = 4000;
    }

    app.use(function (err: any, req: any, res: any, next: any) {
      res.status(err.statusCode).send({
          error: err.name
      })
    })

    app.listen(port, "0.0.0.0", () => {
        console.log(`Server started at port: ${port}`);
    });
});
