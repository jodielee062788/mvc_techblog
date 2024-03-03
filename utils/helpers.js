module.exports = {
    // Format date as MM/DD/YYYY HH:MM:SS AM/PM
    format_date: (date) => {
        return date.toLocaleString();
    },
    // Capitalize the every string in the title
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } 
}