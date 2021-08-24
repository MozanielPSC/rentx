import "reflect-metadata";
import "../../container";
import express, { NextFunction,Request,Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from './routes';
import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection  from "../typeorm"; 
createConnection();
const app = express();
app.use(express.json());
app.use(router);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerFile));
app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  response.status(500).json({
    status:"error",
    message:`Internal Server Error ${err.message}`
  })
});
export{app};