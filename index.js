const express = require('express');
const request = require('request-promise');

const app = express();

const PORT = process.env.PORT || 5000;

// const apiKey = '8c9fa8932b6f2fa8107d759e781ee524';


const generateScraperUrl = (apiKey) => 
    `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Welcome to Amazon Strap API')
})

app.get('/products/:productId?api_key', async(req, res)=>{
    const { productId } = req.params;
    const {api_key} = req.query;
    console.log(productId)
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/dp/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

app.get('/products/:productId/reviews', async(req, res)=>{
    const { productId } = req.params;
    const {api_key} = req.query;
    console.log(productId)
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/product-reviews/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

app.get('/products/:productId/offers', async(req, res)=>{
    const { productId } = req.params;
    const {api_key} = req.query;
    console.log(productId)
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/gp/offer-listing/${productId}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})


app.get('/search/:searchQuery', async(req, res)=>{
    const { searchQuery } = req.params;
    const {api_key} = req.query;
    console.log(searchQuery)
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/s?k=${searchQuery}`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});