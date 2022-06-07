// - - - third-party module imports - - -
const file_system = require('fs'); // import file system module
const operating_system = require('os'); // import operating system module
const _ = require('lodash'); // import lodash utlity
const yargs = require('yargs'); // import yargs

// - - - user-defined modules - - -
const commands = require('./js/commands.js');
const notes_module = require('./js/notes.js'); // load notes.js file
const os_module = require('./js/os_info.js'); // load notes.js file
const start_module = require('./js/start_msg.js');
const welcome_module = require('./js/welcome_msg.js');

// - - -  setup  - - -
const title = { describe: 'title of note', demand: true, alias: 't'};
const body = { describe: 'body of note', demand: true, alias: 'b'};
const argv = yargs
    .command('add', 'add a new note', { title, body } )
    .command('list', 'list all notes')
    .command('read', 'read a note', { title } )
    .command('remove', 'remove a note', { title } ) 
    .command('remove_all', 'remove all notes', {} )
    .command('oldest', 'read least recent note')
    .command('newest', 'read most recent note')
    .command('commands', 'list application commands')
    .help()
    .argv; // command is argument vector from yargs module instead of built-in process.argv

const command = argv._[0]; // grab command from yargs, first item in array
const user = operating_system.userInfo(); // get user info
welcome_module.welcome_message(user); // invoke welcome message

// - - - switch statements for commands - - -
switch (command) {
    case 'add':
        const note_added = notes_module.add_note(argv.title, argv.body);
        if (note_added) {
            console.log('•••• adding new note');
            notes_module.log_note(note_added);
            console.log('•••• note created');
        } else {
            console.log('•••• title taken')
        }
        break;
    case 'list': 
        const notes_listed = notes_module.list_notes();
        notes_listed;
        break;
    case 'read': 
        const note_read = notes_module.read_note(argv.title);
        if (note_read){
            console.log(`\n"${argv.title.toUpperCase()}"\n\n${note_read.body}\n`);
        } else {
            console.log(`•••• no note to read with title "${argv.title}"`)
        }
        break;
    case 'oldest': 
        const oldest_note = notes_module.oldest_note();
        if (oldest_note){
            console.log(`\n(oldest)\n\n"${oldest_note.title.toUpperCase()}"\n\n${oldest_note.body}\n`);
        } else {
            console.log(`•••• no recent notes exist`)
        }
        break;
    case 'newest': 
        const recent_note = notes_module.recent_note();
        if (recent_note){
            console.log(`\n(most recent)\n\n"${recent_note.title.toUpperCase()}"\n\n${recent_note.body}\n`);
        } else {
            console.log(`•••• no recent notes exist`)
        }
        break;
    case 'remove': 
        const note_removed = notes_module.remove_note(argv.title);
        const message = note_removed ? 
        `•••• removing note\t${argv.title}` : 
        `note "${argv.title}" not found`;
        console.log(message);
        break;
    case 'remove_all':
        console.log('•••• removing all notes');
        // write prompt to proceed "are you sure you want to delete all notes? (y / n): "
        // if prompt === "y": remove; else: do nothing ...
        // const all_remvoved = notes.module.remove_all_notes();
        break;
    case 'commands':
        const show_commands = commands.show_commands();
        show_commands;
        break;
    // - - - compile all notes as pdf or txt file - - -
    //case 'pdf_all':
        //console.log('•••• build slow and fast. preparing all notes for pdf.');
        //const pdf_notes = notes_module.write_notes_to_pdf();
        //break;
    
    // - - - compile a note as pdf or text file - - -
    default:
        const invalid_command = commands.command_invalid(command);
        invalid_command;
}