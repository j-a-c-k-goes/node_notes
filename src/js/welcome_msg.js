// - - - setup - - -
const notes_module = require('./notes.js'); // load notes.js file

// - - -  display welcome message - - -
const welcome_message = (user) => {
    // console.log('•••• building welcome message');
    try {
        notes = notes_module.fetch_notes();
        const date = new Date();
        const { username } = user; // destruct user data
        let welcome_message = `
        ${username}\t${date.toDateString()}
        welcome to your notes app
        number of notes: ${notes.length} `;
        console.log(welcome_message);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

// - - - export module function - - -
module.exports = { welcome_message };