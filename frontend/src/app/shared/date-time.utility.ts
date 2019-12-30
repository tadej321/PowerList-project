const dayArray: ReadonlyArray<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const monthArray: ReadonlyArray<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export class DateTimeUtility {
  getFullDatetime: () => Date;
  getCurrentDate: () => void;
  getWeekDayArray: () => ReadonlyArray<string>;
  getMonthOfYearArray: () => ReadonlyArray<string>;
  getFormatedDateString: (date: Date) => string;
  getTaskDateString: (date: Date) => string;
}

DateTimeUtility.prototype.getFullDatetime = () => {
  return new Date();
};

DateTimeUtility.prototype.getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString();
};

DateTimeUtility.prototype.getWeekDayArray = () => {
  return dayArray;
};

DateTimeUtility.prototype.getMonthOfYearArray = () => {
  return monthArray;
};

DateTimeUtility.prototype.getFormatedDateString = (date: Date) => {
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${dayArray[weekDay - 1]}, ${monthDay} ${monthArray[month]} ${year}`;
};

DateTimeUtility.prototype.getTaskDateString = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${dayArray[day - 1]}/${monthArray[month]}/${year}`;
};
