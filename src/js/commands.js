// - - - setup - - -
const fs = require('fs'); // import file system module
const data_file = './command_list.json'; // bind file to variable 

// - - - fetch command list from filesystem - - -

// - - - show all available commands - - -

// - - - command not valid - - -
const command_invalid = (command) => {
	console.log(`
		command "${ command }" not recognized
		--------------------------------------
		type this: node app.js --help
		`);
};

// - - - make exports  - - -
module.exports = { command_invalid,  };