import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const api = process.env.OPENAI_API_KEY; // Access the API key directly from process.env

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY, // Use the apiKey variable here
});
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
       // console.log("Received prompt: " + prompt); // Log the received prompt

        const aiResponse = await openai.createImage({
            prompt:prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:image});
    } catch (error) {
        console.error("Error from DALL-E ");
        //console.log(error);
        res.status(500).json({ error: 'An error occurred while generating the image' });
    }
});

export default router;
