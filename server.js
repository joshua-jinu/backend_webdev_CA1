import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res)=> {
    return res.status(200).send("Welcome to the API");
})

app.post("/signup", (req, res)=>{
    const {username, email, password, dob} = req.body;
    const usernameRegex = /[A-Z a-z 0-9]/
    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.+[a-zA-Z0-9-.]+$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const dateRegex = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/

    if(!usernameRegex.test(username)){
        return res.status(400).send("Invalid username format.");
    }else if(!emailRegex.test(email)){
        return res.status(400).send("Invalid email format.");
    }else if(!passwordRegex.test(password)){
        return res.status(400).send("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    }else if(!dateRegex.test(dob)){
        return res.status(400).send("Invalid date format."); 
    }else if(parseInt(dob.substring(6, 10))>=18){
        // DD/MM/YYYY
        return res.status(400).send("User must be 18 or older."); 
    }
    res.status(200).json({success: true, message: "User created"})

})

app.listen(PORT, ()=>{
    console.log("server listening");
})