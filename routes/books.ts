import express,{Request,Response} from 'express';
const router=express.Router();

interface Book{
    id:number,
    title:string,
    author:string
}

let book:Book[]=[];

router.get("/books",(req,res)=>{
    res.send(book);
})

router.post("/books",(req,res)=>{
    let {id,title,author}=req.body as Book;
    book.push({id,title,author});
    console.log(book);
    res.status(201).send("Book added successfully");
});

router.get("/books/:id",(req:Request,res:Response):void=>{
    let id=parseInt(req.params.id);
    let result=book.filter(ele=>ele.id===id);
    if(result.length >0){
        res.json(result);
        return;
    }
    res.status(404).send("Book Not Found");
})

router.delete("/books",(req:Request,res:Response):void=>{
    let id=parseInt(req.params.id);
    let result=book.find(ele=>ele.id===id);
    if(result){
        book.splice(0,1);
        res.send(`${id} is deleted.`);
        return;
    }
    res.status(404).send("Book Not Found");

})

router.put("/books/:id",(req,res)=>{
    let id=parseInt(req.params.id);
    let {title,author}=req.body;
    let result=book.find(ele=>ele.id==id);
    if(result){
        if(title || author){
            result.title=title;
            result.author=author;
        }
        res.send("Updated Successfully");
        return;
    }
    res.status(404).send("Not Found");
});
export default router;