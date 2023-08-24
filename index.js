const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const { query, response } = require("express");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const pcCollection = client.db("pc-collection").collection("products");
    //data read
    app.get("/products", async (req, res) => {
      const cursor = pcCollection.find({});
      const products = await cursor.toArray();
      res.send({ message: "success", status: 200, data: products });
    });

    //get single data
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = new ObjectId(id);
      const result = await pcCollection.findOne(query);
      res.send({ message: "success", status: 200, data: result });
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("Sererver is running.......!");
});

app.listen(port, () => console.log(`PC Build  ${port}`));
