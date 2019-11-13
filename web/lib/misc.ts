export const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

export const sameDate = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const timeRange = (step: number = 15) => Array.from({length: 24}).flatMap(
  (_, hour) => Array.from({length: 60 / step}).map(
    (_, minute) => `${hour.toString().padStart(2, '0')}:${(minute * step).toString().padStart(2, '0')}`
  )
);
