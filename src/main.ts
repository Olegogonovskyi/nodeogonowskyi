import express, {Request, Response, NextFunction} from "express";
import  mongoose  from 'mongoose';
import {ApiErrors} from "./errors/error.api.service";
import {configs} from "./configs/config";
import {userRouter} from "./routers/userRouter";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/usersWTHpsw', userRouter)

app.use('*', (err:ApiErrors, req: Request, res: Response, next: NextFunction) => {

    res.status(err.status || 500).json(err.message)
});
process.on("uncaughtException", (e) => {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
});


app.listen(configs.APP_PORT, configs.APP_HOST,async ()=> {
    mongoose.connect(configs.MONGO_URL).then(() => console.log('MongoDB connected'))
    console.log(configs.APP_PORT)
})