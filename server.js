import express from "express";

const app = express();
const port = 3000;

app.listen(port, "127.0.0.1", () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
