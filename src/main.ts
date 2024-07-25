import express, {Request, Response, NextFunction} from "express";
import  mongoose  from 'mongoose';
import {userRouter} from "./routes/user.router";
import {ApiErrors} from "./errors/error.api.service";
import {configs} from "./configs/config";
import {authRouter} from "./routes/auth.router";
import {logoutRouter} from "./routes/logout.router";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/logout', logoutRouter)

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