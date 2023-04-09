const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT ||3001;
const morgan = require("morgan")
const cors = require("cors")
var bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

const { Configuration, OpenAIApi }  =  require("openai");
const configuration = new Configuration({
    organization: process.env.CHAT_ORG,
    apiKey: process.env.CHAT_GPT_KEY
});

const openai = new OpenAIApi(configuration);


app.post("/chat", async (req, res) => {
    const { prompt, ip } = req.body
    if(!prompt || !ip) {
        return res.status(400).json({ message: "Invalid request", success:false })
    }
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0,
    });
    res.status(200).json({
        success:true,
        data:response?.data,
        message: response?.data?.choices[0]?.text ?? response.data,
        date: new Date().toISOString()
    })
})
app.get("/", (req, res) =>  res.send("Hello World!"));

app.listen(port, () => console.log(`Chat GPT server is listening on port ${port}!`));
