/**
 * Calculates countdown to a particular day of the week e.g {days: 5, hours: 6, minutes: 25, seconds: 5}.
 */

declare module "count-to-day" {
  /**
   * @param {string} dayOfWeek the day of the week: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
   * @param {function} countDownCb call back function whose params contains the countdown object: {days: number, hours: number, minutes: number, seconds: number }
   * @param {string} timeToCountTo not mandatory. The time to count to, uses 24 hours clock time  e.g '12:00:00', '16:00:00', '1:00:00'. Defaults to '00:00:00' (12 midnight)
   */
  export function CountDownToDay(
    dayOfWeek:
      | "sunday"
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday",
    countDownCb: (countObj: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }) => void,
    timeToCountTo?: string
  ): null;
}
