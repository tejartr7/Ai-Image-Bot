import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'; // Remove the duplicate import
import connectDB from "./mongodb/connect.js";
import Dalle from "./routes/dalle.js";
import Posts from "./routes/posts.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/dalle', Dalle);
app.use('/api/posts', Posts);


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL); // Await the connection
        app.listen(8000, () => console.log('Server started on port 8000'));
        app.get('/', (req, res) => {
            res.send('Hello from Express!');
        });
    } catch (error) {
        console.log("error from index.js");
    }
};

startServer();
