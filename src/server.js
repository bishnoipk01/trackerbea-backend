import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
