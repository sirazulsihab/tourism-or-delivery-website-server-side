const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
// user : 
// pass :

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otdtg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("travelDB");
        const serviceCollection = database.collection("services");
        const orderCollection = database.collection("orders");

    // GET API
    app.get('/services', async (req, res) => {
        const query = {}
        const cursor = serviceCollection.find(query);
        const result = await cursor.toArray();
        res.json(result)
    })
    // POST API
    app.post('/services', async (req, res) => {
        const newUser = req.body;
        const result = await serviceCollection.insertOne(newUser)
        
        res.json(result);
    })
    app.post('/services/byKeys', async (req, res) => {
        const keys = req.body;
        const query = {key : {$in : keys}}
        const service = await serviceCollection.find(query).toArray();
        res.json(service);
    });
    // Order api
    app.post('/orders', async (req, res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.json(result)
    })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('App connetcted');
})


app.listen(port, () => {
    console.log('listening from Port', port);
})