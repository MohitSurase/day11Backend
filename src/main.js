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

//New Todo API
async function addTodo(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("todo");

  let inputDoc = {
    task: req.query.task,
    description: req.query.description,
  };
  await messageColl.insertOne(inputDoc);

  await client.close();
  res.json({ opr: "Success" });
}

app.get("/addtodo", addTodo);

app.get("/addrecord", addrecord);
app.get("/find", findAllmsg);
app.post("/hello", helloPost);
app.listen(4000);
