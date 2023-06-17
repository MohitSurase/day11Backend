import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allowing everyone to make call, we can restrict as well

async function addrecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("myDB");
  const messageColl = db.collection("message");

  let inputDoc = {
    message: req.query.message || "Default",
  };
  await messageColl.insertOne(inputDoc);

  await client.close();

  //string response
  //res.send("Record added");

  //json response :: preferred in industry
  res.json({ opr: "Success" });
}

async function findAllmsg(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("myDB");
  const messageColl = db.collection("message");

  let list = await messageColl.find().toArray();

  await client.close();
  res.json(list);
}

function helloPost(req, res) {
  let result = { opr: true };
  res.json({ result });
}

//http://localhost:4000/addrecord
app.get("/addrecord", addrecord);

//http://localhost:4000/find
app.get("/find", findAllmsg);

//http://localhost:4000/hello
app.post("/hello", helloPost);

//http://localhost:4000/
app.listen(4000);
