import express from 'express';
import {taskRouter} from "./routes/task.routes";
import cors from 'cors';

export function createExpressApp() {
    const app = express();

    const corsOptions = {
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
        optionsSuccessStatus: 200
    }

    app.use(express.json())
    app.use(cors(corsOptions));
    app.use((_req, res, next) => {
        console.log("middleware")
       res.setHeader('Access-Control-Allow-Origin', process.env.CROSS_ORIGIN || 'http://localhost:3000');
       // res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
       res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
       next();
    })

    app.get('/test/', (_req,res)=>{res.json({message:'Server works! Test.'})})
    app.use('/api/tasks', taskRouter)

    return app;
}
