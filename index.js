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

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const countDObj = {
  days: "",
  hours: "",
  minutes: "",
  seconds: "",
};

function CountDownToDay(
  dayOfWeek,
  countDownCb,
  timeToCountTo = "00:00:00",
  countDDate,
  count = countDObj
) {
  if (!dayOfWeek) return null;
  if (typeof dayOfWeek !== "string") throw new Error("Invalid day");

  let countDownDate = countDDate;

  if (!countDDate) {
    const dDay = DAYS.indexOf(dayOfWeek.toLowerCase());

    if (dDay < 0) throw new Error("Invalid day");

    const dTime = new Date(
      `${new Date().toLocaleDateString()} ${timeToCountTo}`
    ).getTime();

    if (isNaN(dTime)) throw new Error("Invalid time");

    const time = new Date().getTime();
    const todayDate = new Date();
    const today = todayDate.getDay();

    if (today > dDay) {
      diff = dDay - today + 7;
    } else if (today === dDay) {
      if (time < dTime) {
        diff = 0;
      } else {
        diff = 7;
      }
    }

    const nextDDay = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() + diff
    );
    const nextDDayToLocaleString = FormatDate(nextDDay);
    countDownDate = new Date(`${nextDDayToLocaleString} ${timeToCountTo}`);
  }

  // Find the distance between now and the count down date
  const now = new Date().getTime();
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // If the count down is finished, clear interval else return time object, call CountDownToDay after a second
  if (distance <= 0) {
    countDownCb?.({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  } else {
    setTimeout(() => {
      countDownCb?.({ days, hours, minutes, seconds }),
        CountDownToDay(dayOfWeek, countDownCb, timeToCountTo, countDownDate, {
          ...count,
          days,
          hours,
          minutes,
          seconds,
        });
    }, 1000);
  }
}

module.exports = { CountDownToDay };
