import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToMongoDB  from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';


dotenv.config({});
const app = express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"Welcome to backend part",
//         success:true
//     })
// })

// app.get("/", (req, res)=>{
//     res.send("Hello world")
// });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption ={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 8080;

//apis
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application",applicationRoute);


app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
})

