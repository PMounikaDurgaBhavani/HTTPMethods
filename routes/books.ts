import express,{Request,Response} from 'express';
import connection from "./db";
const router=express.Router();

interface Book{
    id:number,
    title:string,
    author:string
}

let book:Book[]=[];

router.get("/books",(req,res)=>{
    const query='SELECT * FROM books;';
    connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error Occured");
            return 
        }
        res.json(result);
    })
})

router.post("/books",(req,res)=>{
    let {id,title,author}=req.body as Book;
    const query='INSERT INTO books(title,author) VALUES (?,?);'
    connection.query(query,[title,author],(err)=>{
        if(err){
            res.status(500).send("Error adding book.")
            return
        }
        res.status(201).send("Book added");
    })

});

router.get("/books/:id",(req:Request,res:Response):void=>{
    let query=`SELECT * FROM books WHERE id=${req.params.id}`;
    connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error Occured");
            return
        }
        res.json(result);
    });
})

router.delete("/books/:id",(req:Request,res:Response):void=>{
    let query=`DELETE FROM books WHERE id=${req.params.id}`;
    connection.query(query,(err)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error Occured");
            return
        }
        res.status(200).send("Deleted Successfully");
    })
})

router.put("/books/:id",(req,res)=>{
    let {title}=req.body;
    let id=parseInt(req.params.id);
    let query=`UPDATE books SET title=? WHERE id=?`;
    connection.query(query,[title,id],(err)=>{
        if(err){
            console.log(err);
            res.status(500).send("Error Occured");
            return;
        }
        res.status(200).send("Updated Successfully");
    });
});
export default router;