// app/server.js

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/sit323db';
const dbName = 'sit323db';

app.use(express.json());

let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('✅ Connected to MongoDB');
    db = client.db(dbName);

    // Basic CRUD example route
    app.post('/items', async (req, res) => {
      const result = await db.collection('items').insertOne(req.body);
      res.send(result);
    });

    app.get('/items', async (req, res) => {
      const items = await db.collection('items').find().toArray();
      res.send(items);
    });

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
