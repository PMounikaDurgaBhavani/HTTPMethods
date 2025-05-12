import mysql from 'mysql2';
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"BookDetails"
});

connection.connect(err=>{
    if(err){
        console.error("SQL connection is failed",err)
    }else{
        console.log("Connected to SQL")
        const table=`
        CREATE TABLE IF NOT EXISTS books(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(100),
        author VARCHAR(100)
        );
        `

        connection.query(table,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Table Created Successfully");
            }
        })
    }
});

export default connection;