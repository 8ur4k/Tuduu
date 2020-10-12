const people = [];

// CREATE
function addPerson(name, surname, age) {
  const id = Date.now();
  people.push({ name, surname, age, id });

  return { name, surname, age, id };
}
// READ
function getAllPersons() {
  return people;
}
// UPDATE
function updatePerson(updatedFields, name) {
  const keys = Object.keys(updatedFields);

  for (var i = 0; i < people.length; i++) {
    var obj = people[i];

    if (obj.name == name) {
      for (var index = 0; index < keys.length; index++) {
        people[i][keys[index]] = updatedFields[keys[index]];
      }
      return people;
    }
  }
}
// DELETE
function removePerson(nametoremove) {
  for (var i = 0; i < people.length + 1; i++) {
    var obj = people[i];

    if (obj.name == nametoremove) {
      people.splice(i, 1);
      return null;
    }
  }
}
// GET ONE
function getOnePerson(name) {
  for (var i = 0; i < people.length + 1; i++) {
    var obj = people[i];

    if (obj.name == name) {
      return people[i];
    }
  }
}

module.exports = {
  addPerson: addPerson,
  getAllPersons: getAllPersons,
  updatePerson: updatePerson,
  removePerson: removePerson,
  getOnePerson: getOnePerson,
};
