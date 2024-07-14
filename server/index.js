const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  express.static(path.join(__dirname, "../client/vue-registration/dist"))
);

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.post("/registration", (req, res) => {
  const { step1, step2, step3 } = req.body;
  if (!step1 || !step2 || !step3) {
    return res.status(400).json({ error: "All fields are required" });
  }
  res.status(200).json({ message: "Registration successful" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
