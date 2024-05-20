import "reflect-metadata";
import { DataSource } from "typeorm";


export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 4000,
    username: "root",
    password: "star",
    database: "ongwecare",
    entities: [ ],
    migrations: [],
}); 