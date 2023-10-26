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

const pathnamee = () => {
  try {
    return window.location.pathname;
  } catch (err) {
    return "";
  }
};

function CountDownToDay(
  dayOfWeek,
  countDownCb,
  timeToCountTo = "00:00:00",
  isInfinite = false,
  countDDate,
  count = countDObj,
  pathname = pathnamee()
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

    let diff = dDay - today;

    if (today > dDay) {
      //if today is after the countdown day, go around the week to get to the coundown day
      diff = dDay - today + 7;
    } else if (today === dDay) {
      //today is the coundown day
      if (time < dTime) {
        //same day, before the countdown time
        diff = 0;
      } else {
        //same day, after the countdown time, go for the same day next week
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

  const path = pathnamee();

  // Find the distance between now and the count down date
  const now = new Date().getTime();
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //if pathname changes, stop recursion
  if (path !== pathname) {
    countDownCb?.({ days, hours, minutes, seconds });
  } else if (distance < 0) {
    //if distance < 0 return 0 time
    countDownCb?.({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    if (isInfinite) {
      setTimeout(() => {
        if (seconds >= 0) {
          //if distance >= 0  return distance time
          countDownCb?.({ days, hours, minutes, seconds });
        } else {
          //else, the time just crossed over into the new week countdown
          countDownCb?.({ days: 6, hours: 23, minutes: 59, seconds: 59 });
        }
        //recursion
        CountDownToDay(
          dayOfWeek,
          countDownCb,
          timeToCountTo,
          isInfinite,
          null,
          {
            ...count,
            days,
            hours,
            minutes,
            seconds,
          },
          path
        );
      }, 1000);
    }
  } else {
    setTimeout(() => {
      //return distance time
      countDownCb?.({ days, hours, minutes, seconds });
      //recursion
      CountDownToDay(
        dayOfWeek,
        countDownCb,
        timeToCountTo,
        isInfinite,
        countDownDate,
        {
          ...count,
          days,
          hours,
          minutes,
          seconds,
        },
        path
      );
    }, 1000);
  }
}

module.exports = { CountDownToDay };
