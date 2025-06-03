const express = require('express')
require('dotenv').config()

const bodyparser = require("body-parser")
const cors = require("cors")

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbname = 'PassGuard'

const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

client.connect()

//Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    const allpass = await collection.find({}).toArray();
  res.json(allpass)
})

//Add a password
app.post('/', async (req, res) => {
    const ps = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    await collection.insertOne(ps);
    res.send({success: true})
})

//Delete a password
app.delete('/', async (req, res) => {
    const ps = req.body
    const db = client.db(dbname)
    const collection = db.collection('passwords')
    await collection.deleteOne(ps);
    res.send({success: true})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
