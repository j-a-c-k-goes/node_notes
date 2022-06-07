// - - - function to display os info - - -
const os_info = (operating_system) => {
    let os_info =
`- - - operating system information - - -
network interfaces:\t${ operating_system.networkInterfaces.length }
free memory:\t${ operating_system.freemem() }
hostname:\t${ operating_system.hostname() }
load average:\t${ operating_system.loadavg() }
version:\t${operating_system.version()}`;
    console.log(os_info);
};

// - - - module export - - -
module.exports = { os_info };