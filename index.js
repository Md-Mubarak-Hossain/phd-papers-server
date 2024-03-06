const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5002;
require('dotenv').config();
app.use(cors())
app.use(express.json())
/*.................................................................
                         Json Data section start
...................................................................*/
// const verify-paper=require("verify-paper.json()")
// app.get('/foods', (req, res) => {
//     res.send(verify-paper)
// })
/*.................................................................
                         Json Data section end
...................................................................*/

/*.................................................................
                    Server layout start
 ..................................................................*/
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>verify paper server</title>
</head>

<body style='background:lightblue;'>
    <div style='width:100%;'>
    <div>
    <h4 style='color:green'>The verify paper server is successfully running...</h4>
    <h2 style='text-align:justify;color:green;'>Welcome to the Verify Paper Server!!</h2>
    </div>
        <div style='text-align:center;'>
            <h3>This server build up and Presented:-</h3>
        </div>
        <div style='display:flex;justify-content:center;border-style:outset;width:75%;margin:auto'>
            <ul type='none' style='padding:20px'>
                <li><u><i style='color:black;'>Submited by:-</i></u></li>
                <li style=''>Md Mubarak Hossain
                    <ul type='none'>
                        <li>ID/Roll:191071015</li>
                        <li>Department of Computer Science and Engineering</li>
                        <li>Shanto Mariam University Of Creative Technology</li>
                        <li>Uttara,Dhaka,Bangladesh</li>
                    </ul>
                </li>
            </ul>
            <ul type='none' style='border:2px blue;padding:20px'>
                <li><u><i style='color:black'>Supervised by:-</i></u></li>
                <li style=''>Abdullah Bin Masud
                    <ul type='none'>
                        <li>Coordinator</li>
                        <li>Department of Computer Science and Engineering</li>
                        <li>Shanto Mariam University Of Creative Technology</li>
                        <li>Uttara,Dhaka,Bangladesh</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div style='text-align: center;'>
            <h3>This server build up technologies:-</h3>
        </div>
        <div style='display:flex;justify-content:center;border-style:outset;width:75%;margin:auto'>
            <ul type='none'>
                <li>Used Technology in this server:-
                    <ul type='square'>
                        <li>NodeJs</li>
                        <li>ExpressJS Framework</li>
                        <li>CorJs middleware</li>
                        <li>DotEnv environment</li>
                        <li>MongoDb Database</li>
                        <li>NodemonJs for auto server runner</li>
                    </ul>
                </li>
            </ul>
            <ul type='none'>
                <li>Dependencies:-
                <li>
                <pre>
                "dependencies": {
                   "node": "^21.6.2",
                    "express": "^4.18.3",
                    "cors": "^2.8.5",
                    "dotenv": "^16.4.5",
                    "mongodb": "^6.4.0",
                    "nodemon": "^3.1.0"
                                }
                    </pre>
                </li>
                </li>
            </ul>
            <ul type='none'>
                <li>Deployment:-
                    <li>Deploy in Vercel</li>
                    <dt><a href="https://phd-paper-server.vercel.app/" target="_blank">Server live site</a></dt>
                </li>
            </ul>
            <ul type='none'>
                <li>Push code:-
                    <li>Github</li>
                    <dt><a href="https://github.com/Md-Mubarak-Hossain/phd-papers-server" target="_blank">GitHub Source Code</a></dt>
                </li>
            </ul>
        </div>
    </div>
    <small style='margin-bottom:40px'>&nbsp;</small>
</body>
</html>`)
})
/*.................................................................
                    Server layout end
 .................................................................*/

app.listen(port, () => {
    console.log('PHD PAPER', port)
})

/*.................................................................
                    MongoDB connection url start
...................................................................*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.6osoinv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/*.................................................................
                    MongoDB connection url end
...................................................................*/


async function run() {
    try {
        /*...........................................................
                           Database and data collection start
        .............................................................*/
        const database = client.db("PHD-PAPER");
        const adminCollection = database.collection("admin");
        const instituteCollection = database.collection("institute");
        const userCollection = database.collection("user");
        const phdInfoCollection = database.collection("phdInfo");
        const verifyCollection = database.collection("verify-paper");
        /*...........................................................
                            Database and data collection end
         ...........................................................*/
        /*............................................
                 admin data collection start
        ..............................................*/ 
        app.get("/admin/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await adminCollection.findOne(query);
            res.send(result);
        })

        app.get("/admin", async (req, res) => {
            const query = {};
            const cursor = adminCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/admin', async (req, res) => {
            const file = req.body;
            const result = await adminCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateFile = req.body;
            const updateDoc = {
                $set: {
                    confirmPassword, fname, lname, userName, contact, userPhoto,accountType,
                    fname: updateFile.fname,
                    lname: updateFile.lname,
                    userName: updateFile.userName,
                    email: updateFile.email,
                    contact: updateFile.contact,
                    userPhoto: updateFile.userPhoto,
                    type: updateFile.accountType,
                    password: updateFile.password,
                    confirmPassword: updateFile.confirmPassword

                }
            }
            const result = await adminCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/admin/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await adminCollection.deleteOne(query);
            res.send(result);
        })
        /*............................................
                 user data collection start
        ..............................................*/ 
        app.get("/user/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.get("/user", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/user', async (req, res) => {
            const file = req.body;
            const result = await userCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/user/:id', async (req, res) => {
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

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        /*...........................................................
                             phd info data collection start
          .............................................................*/
        app.get("/phdInfo/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await phdInfoCollection.findOne(query);
            res.send(result);
        })

        app.get("/phdInfo", async (req, res) => {
            const query = {};
            const cursor = phdInfoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/phdInfo', async (req, res) => {
            const file = req.body;
            const result = await phdInfoCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/phdInfo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateFile = req.body;
            const updateDoc = {
                $set: {
                    email: updateFile.email,
                    password: updateFile.password,

                }
            }
            const result = await phdInfoCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/phdInfo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await phdInfoCollection.deleteOne(query);
            res.send(result);
        })

        /*...........................................................
                                     phd info data collection end
         .............................................................*/

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