// - - - setup - - -
const fs = require('fs'); // import file system module
const data_file = './command_list.json'; // bind file to variable 

// - - - fetch command list from filesystem - - -
const fetch_commands = () => {
	try {
		const command_list = fs.readFileSync(data_file); // use filename to fetch notes - - -
		return JSON.parse(command_list); // return value from JSON.parse method
	} catch (error) {
		return []; // fail, return empty array 
	}
};

// - - - show all available commands - - -
const show_commands = () => {
      const commands = fetch_commands();
      console.log('\nAPP COMMANDS\n');
      commands.forEach( (command) => { 
      	console.log(`${command.command} "${command.desc}"\noptions\t--[${command.flags}]\n`);
      });
};

// - - - command not valid - - -
const command_invalid = (command) => {
	console.log(`•••• command "${ command }" not recognized. showing available commands`);
	show_commands();
};

// - - - make exports  - - -
module.exports = { show_commands, command_invalid,  };
