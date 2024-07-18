import express, {Request, Response, NextFunction} from "express"
import  mongoose  from 'mongoose'

import {userRouter} from "./routes/user.router";
import {ApiErrors} from "./errors/error.api.service";



const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)

app.use('*', (err:ApiErrors, req: Request, res: Response, next: NextFunction) => {

    res.status(err.status || 500).json(err.message)
});
process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});



const PORT = 5300
app.listen(PORT, ()=> {
    mongoose.connect('mongodb://localhost:27017/olegbase').then(() => console.log('MongoDB connected'))
    console.log(PORT)
})