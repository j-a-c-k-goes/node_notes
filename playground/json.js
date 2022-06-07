// - - - create a test object - - -
const object = {
	name: 'jack',
	race: null
}

// - - - convert object to JSON - - -
const string_object = JSON.stringify(object);
console.log(typeof string_object);
console.log(string_object);

// - - - convert JSON string back to object - - -
const person_string = '{"name": "AAA", "age": 0}';
const person = JSON.parse(person_string);

// - - - console calls - - -
console.log(
	`
	- - - - - - - - -  
	typeof: ${typeof person_string}
	string: ${person_string}
	typeof: ${typeof person}
	name / age: ${person.name}\t${person.age}
	- - - - - - - - -
	`);

// - - - module import - - -
const fs = require('fs');

// - - - define the object - - -
const original_note = {
	title: 'some title',
	body: 'some body'
};

// - - - turn orginal note object into string - - -
const original_note_string = JSON.stringify(original_note);

// - - - write the string to the filesystem - - -
fs.writeFileSync('notes.json', original_note_string);

// - - - read content from a file - - -
const note_string = fs.readFileSync('notes.json');

// - - - convert string back into object - - -
const note = JSON.parse(note_string);

// - - - console calls - - -
console.log(
	`
	- - - - - - - - -  
	typeof: ${typeof note}
	title: ${note.title}
	note: ${note.body}
	- - - - - - - - -
	`);