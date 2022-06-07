/*
    on command line: node inspect <file_name>
*/
const person = { "name": "jack" };

person.home = true;

debugger;

person.name = "jill";

console.log(person);

module.exports = { person };