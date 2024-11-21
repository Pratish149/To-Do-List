require("./config/mongodb");
const List = require("./models/listModel");
const express = require("express");
var cors = require("cors");

const corsOptions = {
  origin: "https://to-do-list-ps.vercel.app",
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/list", async (req, resp) => {
  // Add CORS headers
    resp.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-ps.vercel.app'); // Your frontend origin
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed HTTP methods
    resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        resp.status(200).end(); // Respond to preflight with a 200 OK
        return;
    }
  const list = await List.find();
  resp.send(list);
});

app.post("/list/add", async (req, resp) => {
  const data = new List(req.body);
  const response = await data.save();
  resp.send({ status: "SUCCESS", item: response });
});

app.put("/list/update/:_id", async (req, resp) => {
  const response = await List.updateOne(req.params, {
    $set: req.body,
  });
  const { modifiedCount } = response || {};
  if (modifiedCount > 0) {
    resp.send({ status: "SUCCESS" });
  } else {
    resp.status(400).send({ status: "FAILED", message: "TASK_NOT_FOUND" });
  }
});

app.delete("/list/delete/:_id", async (req, resp) => {
  const response = await List.deleteOne(req.params);
  const { deletedCount } = response || {};
  if (deletedCount > 0) {
    resp.send({ status: "SUCCESS" });
  } else {
    resp.status(400).send({ status: "FAILED", message: "TASK_NOT_FOUND" });
  }
});

app.listen(process.env.PORT);
