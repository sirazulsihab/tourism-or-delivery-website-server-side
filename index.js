const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());

// user : 
// pass :FugxSnzA1NQWMmY4

const uri = "mongodb+srv://sihab:FugxSnzA1NQWMmY4@cluster0.otdtg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("travelDB");
        const serviceCollection = database.collection("services");
    // GET API
    app.get('/services', async (req, res) => {
        const query = {}
        const cursor = serviceCollection.find(query);
        const result = await cursor.toArray();
        console.log(result);
        res.json(result)
    })
    // POST API
    app.post('/service', async (req, res) => {
        
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