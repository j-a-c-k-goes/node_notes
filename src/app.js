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
const ping = {describe:'ip destination', demand: true, alias: 'p'}
const argv = yargs
    .command('count', 'count notes saved', {})
    .command('add', 'add a new note', { title, body } )
    .command('list', 'list all notes', {})
    .command('read', 'read a note', { title } )
    .command('remove', 'remove a note', { title } )
    .command('burn', 'delete all notes ⚠️', {} )
    .command('restore', 'restore notes from backup file', {})
    .command('ping', 'send note to destination', { title, ping } )
    .command('hash', 'hash current notes', {})
    .command('backup', 'backup current notes',{})
    .command('oldest', 'read least recent note', {})
    .command('newest', 'read most recent note', {})
    .command('commands', 'list application commands', {})
    .help()
    .argv; // command is argument vector from yargs module instead of built-in process.argv

const command = argv._[0]; // grab command from yargs, first item in array
const user = operating_system.userInfo(); // get user info
welcome_module.welcome_message(user); // invoke welcome message

// - - - switch statements for commands - - -

switch (command) {
    case 'count':
        const notes_to_count = notes_module.count_notes();
        console.info(`there are ${notes_to_count} notes`);
        break;
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
            console.log(`\n(least recent)\t"${oldest_note.title.toUpperCase()}"\n${oldest_note.body}\n`);
        } else {
            console.log(`•••• no recent notes exist`)
        }
        break;
    case 'newest': 
        const recent_note = notes_module.recent_note();
        if (recent_note){
            console.log(`\n(most recent)\t"${recent_note.title.toUpperCase()}"\n${recent_note.body}\n`);
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
    case 'burn': 
        const delete_all = notes_module.remove_all();
        break;
    case 'restore': 
        const restore_notes = notes_module.restore_notes("backups/backup_0_6_2022");
        break;
    case 'hash': 
        const notes_to_hash = notes_module.hash_notes();
        break;
    case 'backup': 
        const backup_notes = notes_module.backup_notes();
        break;
    // case 'ping':
    //     console.log('- - - sending ping with note to destination - - -');
    case 'commands':
        const show_commands = commands.show_commands();
        show_commands;
        break;
    default:
        const invalid_command = commands.command_invalid(command);
        invalid_command;
}