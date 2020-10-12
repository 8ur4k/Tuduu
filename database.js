const people = [];

// CREATE
function addPerson(name, surname, age) {
  people.push({ name, surname, age });

  return { name, surname, age };
}
// READ
function getAllPersons() {
  return people;
}
// UPDATE
function updatePerson(name, newname) {
  for (var i = 0; i < people.length; i++) {
    var obj = people[i];

    if (obj.name == name) {
      obj.name = newname;
      return people[i];
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
