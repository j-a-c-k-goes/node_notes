// - - - setup - - -
const fs = require('fs'); // import file system module
const data_file = './notes_data.json'; // bind file to variable
const { jsPDF } = require('jspdf');
const crypto = require('crypto');

// - - - fetch notes from filesystem - - -
const fetch_notes = () => {
	try {
		const notes_string = fs.readFileSync(data_file); // use filename to fetch notes - - -
		return JSON.parse(notes_string); // return value from JSON.parse method
	} catch (error) {
		return []; // fail, return empty array 
	}
};

// - - - save notes to filesystem - - -
const save_notes = (notes) => {
	// - - - write the updates to filesystem - - -
	fs.writeFileSync(data_file, JSON.stringify(notes, null, 2));
};

// - - - log note - - -
const log_note = (note) => {
	debugger;
	try {
		const note_display_max = 72;
		if (note.body.length >= note_display_max){
			const log = {
				length: note.body.length,
				title: note.title,
				body: note.body,
				shortened_by: note.body.length - note_display_max
			};
			console.log(
		`
${ log.title.toUpperCase() }
${ log.body.slice(0, note_display_max) } ...
${ log.length } characters | shortened by ${ log.shortened_by }
		`
			);
			return log;
	} else {
		const log = {
			length: note.body.length,
			title: note.title,
			body: note.body,
		};
		console.log( 
		`
${ log.title.toUpperCase() }
${ log.body }
${ log.length } characters
		`);
		return(log);
	}
} catch (error) {
	return 1;
	}
};
// --- count the number of notes ---
const count_notes = () => {
	try {
		const notes = fetch_notes();
		console.info("getting the number of notes saved");
		return notes.length;
	} catch (error){
		console.error(`an error has occured\n${error}`);
		return 1;
	}
};
// - - - create add note function - - 
const add_note = (title, body) => {
	try {
		const notes = fetch_notes(); // fetch notes
		const note = { title, body }; //  define note as an object 
		const duplicate_notes = notes.filter( (note) => note.title === title); // - - - check for duplicates - - -
		console.log('•••• checking for duplicates');
		// - - - if note is not a duplicate, add to data - - -
		if (duplicate_notes.length === 0){
			console.log('•••• note not a duplicate, ok to add');
			notes.push(note); // push note into notes 
			save_notes(notes); // save to filesystem 
			return note;
		} else { 
			console.log('•••• note is duplicate, not adding'); // update console
		}
	} catch (error){
		return 1;
	}
};

// - - - list all notes - - -
const list_notes = () => {
	try {
		const notes = fetch_notes();
		console.log(`\n•••• DISPLAYING ${notes.length} NOTE(S)\n`)
		notes.forEach( (note) => { log_note(note); });
		return 0;
	} catch (error){
		return 1;
	}
};	

// - - - read a specific note - - -
const read_note = (title) => {
	try {
		const notes = fetch_notes(); // fetch notes 
		const filtered_notes = notes.filter( (note) => note.title === title); // filter for title equivalence
		return filtered_notes[0]; // return first element in filtered array
	}
	catch (error){
		console.log('•••• no note to read, check title spelling and retry')
		return 1;
	}
};

// - - - get most recent note - - -
const recent_note = () => {
	try {
		const notes = fetch_notes(); // fetch notes
		const recent_note = notes[ notes.length - 1 ];
		return recent_note;
	} catch (error) {
		return 1;
	}
}

// - - - get most recent note - - -
const oldest_note = () => {
	try {
		const notes = fetch_notes(); // fetch notes
		const oldest_note = notes[ 0 ];
		return oldest_note;
	} catch (error) {
		return 1;
	}
}

// - - - remove a specific note - - -
const remove_note = (title) => {
	try {
		const notes = fetch_notes(); // fetch notes
		const filtered_notes = notes.filter( (note) => note.title !== title); // filter notes, remove one with title of argument
		save_notes(filtered_notes); // save notes
		return notes.length !== filtered_notes.length; // check if notes.length not equal to filtered notes.length, shoudl be false
	} catch (error) {
		return 1;
	}
};

// - - - remove all notes - - -
const remove_all = () => {
	try{
		const notes = fetch_notes();
		const backup = notes;
		const backup_location = './.backup_of_notes.json';
		console.log(`creating a backup for the undoable.`);
		fs.writeFileSync(backup_location, JSON.stringify(notes, null, 2));
		console.log(`ok, preparing to delete ${notes.length} notes`);
		fs.unlinkSync(data_file);
		console.info('notes deleted...')
	} catch (error) {
		console.error(error);
		return 1;
	}
}

// - - - restore notes from a backup - - -
const restore_notes = (backup_file) => {
	try{
		console.log(`restoring notes from backup file "${backup_file}"`);
		const notes_to_restore = fs.readFileSync(backup_file); 
		const restored_notes = JSON.parse(notes_to_restore);
		fs.writeFileSync(data_file, JSON.stringify(restored_notes, null, 2));
		const notes = fetch_notes();
		console.log(`${notes.length} notes restored!`);
	} catch (error) {
		console.log(error);
		return 1;
	}
}

// - - - create a hash of all notes - - -
const hash_notes = () => {
	try {
		const notes = fetch_notes();
		let hashed_notes = [];
		const hash_directory = './hashed_notes'; 
		console.log(`preparing to hash ${notes.length} notes.`);
		notes.forEach((note) =>{
			const title = crypto.createHash('sha256', note)
		                   .update( note.title )
		                   .digest('hex');
		    const body = crypto.createHash('sha256', note)
		                   .update( note.body )
		                   .digest('hex');
		    hashed_notes.push( { title, body } );
		});
		console.log(`writing hashed notes to specified location.`);
		fs.writeFileSync(`${hash_directory}/hashed.json`, JSON.stringify(hashed_notes, null, 2));
		return hashed_notes;
	} catch (error) {
		console.error(error);
		return 1;
	}
} 

// - - - backup current notes - - -
const backup_notes = () => {
	try {
		const notes = fetch_notes();
		const date = new Date();
		const date_ext = `${date.getDay()}_${date.getMonth()}_${date.getFullYear()}`;
		console.log(`preparing to backup ${notes.length} notes`);
		const backup_dir = './backups';
		if (fs.existsSync(backup_dir)){
			console.log('path already exists, backing up notes here.');
			fs.writeFileSync(`${backup_dir}/backup_${date_ext}`, JSON.stringify(notes, null, 2));
		} 
		else {
			fs.mkdirSync(backup_dir);
			fs.writeFileSync(`${backup_dir}/backup_${date_ext}`, JSON.stringify(notes, null, 2));
		}
		console.log(`notes as of ${date.toDateString()} backed up! `);
	} catch (error) {
		console.error(error);
		return 1;
	}	
};

// - - - make exports  - - -
module.exports = { 
	count_notes,
	add_note, 
	list_notes, 
	read_note, 
	remove_note, 
	remove_all,
	restore_notes,
	hash_notes,
	backup_notes,
	log_note,  
	recent_note, 
	oldest_note 
};
