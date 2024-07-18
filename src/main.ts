import express, {Request, NextFunction, Response} from 'express'
import {userRouter} from "./route/users.route";
import {ErrorApiService} from "./errors/error.api.service";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)

app.use('*', (err:ErrorApiService, req: Request, res: Response, next: NextFunction) => {

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