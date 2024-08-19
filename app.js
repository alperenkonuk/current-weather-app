import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const port = 3000;
const apiKey = process.env.apiKey;
const apiURL = process.env.apiURL;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.post('/', async (req, res) => {
    try {
        const cityName = req.body.city;
        const response = await axios.get(`${apiURL}`, {
            params: {
                q: cityName,
                key: apiKey,
            }
        })
        res.render('index.ejs', {data: response.data, wide: true})
    } catch (e) {
        console.error('error message: ' + e.message)
        res.status(500)
        res.render('index.ejs', {error: true})
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})