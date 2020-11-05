const { rejects } = require("assert");
const fs = require("fs");
const { finished } = require("stream");
const data = fs.readFileSync("database.json");
const people = JSON.parse(data);

// CREATE
async function addPerson(name, surname, age) {
  const id = Date.now();
  people.push({ name, surname, age, id });
  await saveFile();
  return { name, surname, age, id };
}

// READ
function getAllPersons() {
  return people;
}
// UPDATE
async function updatePerson(updatedFields, id) {
  const keys = Object.keys(updatedFields);

  for (var i = 0; i < people.length; i++) {
    if (people[i].id == id) {
      for (var index = 0; index < keys.length; index++) {
        people[i][keys[index]] = updatedFields[keys[index]];
      }
      await saveFile();
      return people[i];
    }
  }
}
// DELETE
async function removePerson(idToRemove) {
  for (var i = 0; i < people.length + 1; i++) {
    var obj = people[i];

    if (obj.id == idToRemove) {
      people.splice(i, 1);
      await saveFile();
      return null;
    }
  }
}
// GET ONE
function getOnePerson(id) {
  for (var i = 0; i < people.length + 1; i++) {
    var obj = people[i];

    if (obj.id == id) {
      return people[i];
    }
  }
}

// const saveFile = () => {
//   const data = JSON.stringify(people, null, 2);
//   fs.writeFile("database.json", data);
// };

const saveFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile("database.json", JSON.stringify(people, null, 2), (err) => {
      if (err) reject("Could not write file");
      resolve("Success");
    });
  });
  // const data = JSON.stringify(people, null, 2);
  // fs.writeFile("database.json", data);
};

module.exports = {
  addPerson: addPerson,
  getAllPersons: getAllPersons,
  updatePerson: updatePerson,
  removePerson: removePerson,
  getOnePerson: getOnePerson,
};
