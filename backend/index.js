import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { mongoose } from "./controller.js";
import setUpRoutes from "./routes.js";

// connect to Mongo DB
mongoose.connect(
    "mongodb+srv://zvcipriano:pMZffGlZOjQSQkS7@cluster0.awrgxuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",  
    { useNewUrlParser:true, useUnifiedTopology:true },
    (err) => {
        if (err) { console.log(err) }
        else { console.log("Successfully connected to DBTeam!" ) }
    }
);

const port = 3001;

// initialize the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// setup routes
setUpRoutes(app);

// start server
app.listen(port, (err) => {
  if (err) { console.log(err); }
  else { console.log(`Server listening at port ${port}`); }
});