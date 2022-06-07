// - - - setup - - -
const fs = require('fs'); // import file system module
const data_file = './notes_data.json'; // bind file to variable
const { jsPDF } = require('jspdf');

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
	fs.writeFileSync(data_file, JSON.stringify(notes));
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
		${ log.length } characters | shotened by ${ log.shortened_by }
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
		const recent_note = notes[ notes.length -1 ];
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

// - - - write notes to pdf file - - -
const write_notes_to_pdf = () => {
	const notes = fetch_notes();
	console.log(`•••• creating .pdf containing ${notes.length} of your note(s)`);
	const pdf = new jsPDF( { orientation: 'portrait' });
	// - - - define settings - - -
	const font = 'Helvetica';
	const detail_font_size = 16;
	const normal_font_size = 12;
	const small_font_size = 8;
	const medium_font_size = 20;
	const large_font_size = 36;

	pdf.setPage(1);
	pdf.setLineWidth(360);

	pdf.setFont(font, 'bold');
	pdf.setFontSize(large_font_size);
	const pdf_title = `${notes[0].title}`;
	pdf.text(pdf_title, 10, 128);
	
	pdf.setFont(font, '');
	pdf.setFontSize(medium_font_size);
	const pdf_body = `${notes[0].body}`;
	console.log(pdf_body.length);
	pdf.text(pdf_body, 10, 172);
	// - - - dividing lines - - -
	const top_line = () => { pdf.line(10,32,200,32,'S'); };
	const top_line_2 = () => { pdf.line(10,68,200,68,'S'); };
	const mid_line = () => { pdf.line(10,136,200,136,'S'); };
	const end_line =  () => { pdf.line(10,280,200,280,'S'); };
	const vertical_half = () => { pdf.line(100,136,100,280,'S') };
	// - - - save contract - - -
	top_line();
	top_line_2();
	mid_line();
	end_line();
	vertical_half();

	pdf.save(`./${notes[0].body.slice(0,2)}.pdf`);
	return pdf;
};

// - - - make exports  - - -
module.exports = { 
	add_note, 
	list_notes, 
	read_note, 
	remove_note, 
	log_note,  
	write_notes_to_pdf, 
	recent_note, 
	oldest_note 
};