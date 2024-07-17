import express, {Request, Response, NextFunction} from "express"

import {userRouter} from "./routes/user.router";
import {ApiErrors} from "./errors/error.api.service";


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)

app.use((err:ApiErrors, req: Request, res: Response, next: NextFunction) => {

    res.status(err.status || 500).json(err.message)
});
process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});



const PORT = 5300
app.listen(PORT, ()=> {
    console.log(PORT)
})