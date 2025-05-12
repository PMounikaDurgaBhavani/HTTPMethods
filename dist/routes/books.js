"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
let book = [];
router.get("/books", (req, res) => {
    const query = 'SELECT * FROM books;';
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
            return;
        }
        res.json(result);
    });
});
router.post("/books", (req, res) => {
    let { id, title, author } = req.body;
    const query = 'INSERT INTO books(title,author) VALUES (?,?);';
    db_1.default.query(query, [title, author], (err) => {
        if (err) {
            res.status(500).send("Error adding book.");
            return;
        }
        res.status(201).send("Book added");
    });
});
router.get("/books/:id", (req, res) => {
    let query = `SELECT * FROM books WHERE id=${req.params.id}`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
            return;
        }
        res.json(result);
    });
});
router.delete("/books/:id", (req, res) => {
    let query = `DELETE FROM books WHERE id=${req.params.id}`;
    db_1.default.query(query, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
            return;
        }
        res.status(200).send("Deleted Successfully");
    });
});
router.put("/books/:id", (req, res) => {
    let { title } = req.body;
    let id = parseInt(req.params.id);
    let query = `UPDATE books SET title=? WHERE id=?`;
    db_1.default.query(query, [title, id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error Occured");
            return;
        }
        res.status(200).send("Updated Successfully");
    });
});
exports.default = router;
