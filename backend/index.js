import express from 'express';
import bodyparser from 'body-parser';


const port =3001;
const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.listen(port,()=>{

    console.log(`Server running on ${port}`);
});