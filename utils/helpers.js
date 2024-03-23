const format_date = (date) => {
  // Check if the date value is undefined or null
  if (!date) {
      return ''; // Return an empty string if date is undefined or null
  }

  // Convert the date to a formatted string
  const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
  };
  const formattedDate = new Date(date).toLocaleString('en-GB', options);

  // Split the formatted date into date and time parts
  const [datePart, timePart] = formattedDate.split(', ');

  // Return the formatted date and time in two lines
  return `${datePart}<br>${timePart}`;
};

module.exports = { format_date };
