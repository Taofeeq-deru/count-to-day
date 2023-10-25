const FormatDate = (date) => {
  date = new Date(date);
  const monthNames = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  if (day < 10) day = `0${day}`;

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};
