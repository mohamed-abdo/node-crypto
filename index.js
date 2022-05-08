const express = require("express");
const { cryptoRoute } = require("./crypto.route");
const app = express();
const port = 3000;

app.use(express.json());
app.use((req, _, next) => {
  console.log(`request: ${req.url}`);
  next();
});

app.use("/crypto", cryptoRoute);
app.get("/", (_, res) => {
  res.status(200).send("https://google.com");
});

app.listen(port, () => {
  console.log("app is up and running on port:%s", port);
});
