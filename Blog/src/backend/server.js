var express = require("express");
var app = express();
//import articlesData from "./frontend/articlesData.js";
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require("cors");

app.use(cors());
const art = require("../frontend/articlesData");
/*const articlesData = [
  {
    id: 1,
    vote: 0,
    Nom: "Article 1",
    titre: "The mentalist"
  },
  {
    id: 2,
    vote: 0,
    Nom: "Article 2",
    titre: "Patrick Jane"
  }
];*/
/*
app.get("", function(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(art.articlesData));
});
*/
app.get("/articles", function(req, res) {
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(art.articlesData));
});

app.post("/vote", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  var id = req.body.id;
  var count = req.body.count;
  art.articlesData[id].vote = art.articlesData[id].vote + 1;
  res.send(JSON.stringify(art.articlesData));
});

app.get("/vote", function(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(art.articlesData[req.params.idd]));
});

app.listen(5000, () => {
  console.log(`Server is running on port: 5000`);
});
