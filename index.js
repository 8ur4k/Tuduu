const express = require("express");
// const database = require("./database");
const Database = require("./database");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "pug");

// CREATE
app.post("/people", (req, res) => {
  const { name, surname, age } = req.body;
  const newPerson = Database.addPerson(name, surname, age);

  res.status(201).json({
    status: "success",
    data: {
      data: newPerson,
    },
  });
});

// READ
app.get("/people/:name", (req, res) => {
  const result = Database.getOnePerson(req.params.name);

  res.status(200).json({
    status: "success",
    data: {
      data: result,
    },
  });
});

// UPDATE
app.patch("/people", (req, res) => {
  const result = Database.updatePerson(req.body.name, req.body.newname);

  res.status(200).json({
    status: "success",
    data: {
      data: result,
    },
  });
});

// DELETE
app.delete("/people/:name", (req, res) => {
  const result = Database.removePerson(req.params.name);

  res.status(204).json({
    status: "success",
    data: result,
  });
});

// GET ALL
app.get("/", (req, res) => {
  const result = Database.getAllPersons();

  res.status(200).json({
    status: "success",
    results: result.length,
    data: {
      data: result,
    },
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
