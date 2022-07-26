// - - -  display welcome message - - -
const welcome_message = (user) => {
    // console.log('•••• building welcome message');
    try {
        const date = new Date();
        const { username } = user; // destruct user data
        let welcome_message = `${username}\t${date.toDateString()}\nwelcome to your notes app!`;
        console.log(welcome_message);
        return 0;
    } catch (error) {
        console.log(error);
        return 1;
    }
}

// - - - export module function - - -
module.exports = { welcome_message };