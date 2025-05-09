"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let book = [];
router.get("/books", (req, res) => {
    res.send(book);
});
router.post("/books", (req, res) => {
    let { id, title, author } = req.body;
    book.push({ id, title, author });
    console.log(book);
    res.status(201).send("Book added successfully");
});
router.get("/books/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let result = book.filter(ele => ele.id === id);
    if (result.length > 0) {
        res.json(result);
        return;
    }
    res.status(404).send("Book Not Found");
});
router.delete("/books/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let result = book.find(ele => ele.id === id);
    if (result) {
        book.splice(book.indexOf(result), 1);
        res.send(`${id} is deleted.`);
        return;
    }
    res.status(404).send("Book Not Found");
});
router.put("/books/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let { title, author } = req.body;
    let result = book.find(ele => ele.id == id);
    if (result) {
        if (title || author) {
            result.title = title;
            result.author = author;
        }
        res.send("Updated Successfully");
        return;
    }
    res.status(404).send("Not Found");
});
exports.default = router;
