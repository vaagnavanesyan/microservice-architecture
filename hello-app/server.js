const express = require("express");
const app = express();
const port = 80;

app.get("/health", (req, res) => {
  res.send(JSON.stringify({ status: "ok" }));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is running...`);
});
