"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "BookDetails"
});
connection.connect(err => {
    if (err) {
        console.error("SQL connection is failed", err);
    }
    else {
        console.log("Connected to SQL");
        const table = `
        CREATE TABLE IF NOT EXISTS books(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100),
        author VARCHAR(100)
        );
        `;
        connection.query(table, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Table Created Successfully");
            }
        });
    }
});
exports.default = connection;
