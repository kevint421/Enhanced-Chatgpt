const { OpenAI } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const openai = new OpenAI({
    apiKey: process.env.API_KEY
  });


const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async(req, res) => {
    const {message} = req.body;
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });
        res.json({
            message: response.choices[0].text,
        })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});

