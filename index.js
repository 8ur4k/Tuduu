const express = require("express");
// const database = require("./database");
const { celebrate, Joi, errors, Segments } = require("celebrate");
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

app.post(
  "/people",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      age: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { name, surname, age } = req.body;
      const newPerson = await Database.addPerson(name, surname, age);

      res.status(201).json({
        status: "success",
        data: {
          data: newPerson,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);
app.use(errors());

// READ
app.get("/people/:id", (req, res) => {
  const result = Database.getOnePerson(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      data: result,
    },
  });
});

// UPDATE
app.patch(
  "/people/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      surname: Joi.string(),
      age: Joi.number(),
    }),
  }),
  async (req, res) => {
    const result = await Database.updatePerson(req.body, req.params.id);
    console.log(result);
    res.status(200).json({
      status: "success",
      data: {
        data: result,
      },
    });
  }
);
app.use(errors());

// DELETE
app.delete(
  "/people/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      surname: Joi.string(),
      age: Joi.number(),
    }),
  }),
  async (req, res) => {
    const result = Database.removePerson(req.params.id);

    res.status(204).json({
      status: "success",
      data: result,
    });
  }
);
app.use(errors());

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
