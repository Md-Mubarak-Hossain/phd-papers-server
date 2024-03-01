const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
// const verify-paper=require("verify-paper.json()")
const port = process.env.PORT || 5002;
require('dotenv').config();
app.use(cors())
app.use(express.json())
// app.get('/foods', (req, res) => {
//     res.send(verify-paper)
// })
app.get('/', (req, res) => {
    res.send(`PHD verify-paper server run`)
})
app.listen(port, () => {
    console.log('PHD PAPER', port)
})

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@librarycluster.iklz7tv.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://mubarak:mubarak@cluster1.6osoinv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("PHD-PAPER");
        const verifyCollection = database.collection("verify-paper");
        // const bookingCollection = database.collection("booking");
        const userCollection = database.collection("users");

        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.get("/users", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const file = req.body;
            const result = await userCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateFile = req.body;
            const updateDoc = {
                $set: {
                    email: updateFile.email,
                    password: updateFile.password,

                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        app.get("/verify-paper", async (req, res) => {
            const query = {};
            const cursor = verifyCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/verify-paper/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await verifyCollection.findOne(query);
            res.send(result);
        })

        app.get("/verifyEmail/:email", async (req, res) => {
            const query = { email: req.params.email };
            const result = await verifyCollection.findOne(query);
            res.send(result);
        })

        app.post('/verify-paper', async (req, res) => {
            const file = req.body;
            const result = await verifyCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/verify-paper/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateVerify = req.body;
            const updateDoc = {
                $set: {
                    name: updateVerify.name,
                    price: updateVerify.price,
                    description: updateVerify.description

                }
            }
            const result = await verifyCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/verify-paper/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await verifyCollection.deleteOne(query);
            res.send(result);
        })
        app.get("/orders", async (req, res) => {
            const query = {};
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.findOne(query);
            res.send(result);
        })

        app.get("/orderEmail/:email", async (req, res) => {
            const query = { email: req.params.email };
            const result = await bookingCollection.findOne(query);
            res.send(result);
        })

        app.post('/orders', async (req, res) => {
            const file = req.body;
            const result = await bookingCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateorders = req.body;
            const updateDoc = {
                $set: {
                    name: updateorders.name,
                    price: updateorders.price,
                    description: updateorders.description

                }
            }
            const result = await bookingCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // ....
    }
}
run().catch(err => console.error(err))