# count-to-day

It is a lightweight javascript package that calculates countdown to a particular day of the week.

## Installation

```js
npm install count-to-day --save
//or with yarn
yarn add count-to-day
```

## Params

| Params        | Type                                                                                     | Description                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| dayOfWeek     | 'sunday' \| 'monday' \| 'tuesday' \| 'wednesday' \| 'thursday' \| 'friday' \| 'saturday' | the day of the week you want to count down to                                                                                                |
| countDownCb   | function                                                                                 | call back function whose params contains the countdown object: _{days: number, hours: number, minutes: number, seconds: number }_            |
| timeToCountTo | string                                                                                   | not mandatory. The time to count to, uses 24 hours clock time, e.g '12:00:00', '16:00:00', '1:00:00'. Defaults to _'00:00:00'_ (12 midnight) |
| isInfinite    | boolean                                                                                  | A boolean flag that determines if the time should restart after the date to countdown to is reached. Defaults to _false_                     |

## Usage

```js
import { CountDownToDay } from "count-to-day";

CountDownToDay("wednesday", (count) => console.log("count=", count), "10:42:00");
//=> count =  { days: number, hours: number, minutes: number, seconds: number }
//(logs an object like this that contains the countdown)
```

Or use in a custom hook

```js
import { useEffect, useState } from "react";
import { CountDownToDay } from "count-to-day";

const useCountdown = (dayOfWeek = "friday", timeToCountTo = "00:00:00") => {
  const [count, setCount] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    CountDownToDay(dayOfWeek, setCount, timeToCountTo);
  }, [dayOfWeek, timeToCountTo]);

  return { count };
};

export default useCountdown;
```
