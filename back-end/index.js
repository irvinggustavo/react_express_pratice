const express = require("express");
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const data = require("./data");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/students", (req, res) => {
  res.json(data.students);
});

app.post("/students", (req, res) => {
  const { name, program, grade } = req.body;

  data.students.push({
    id: uuidv4(),
    name,
    program,
    grade,
  });

  res.json(data.students);
});

app.delete("/students/:id", (req, res) => {
  let ids = data.students.map((student) => student.id);
  let idToDelete = ids.indexOf(req.params.id);
  data.students.splice(idToDelete, 1);
  res.send(data.students);
});

app.listen(port, () => console.log(`Listening on ${port}`));
