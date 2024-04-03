export function formatDate(date: any) {
  // Get day, month, and year
  let day = date.getDate();
  let month = date.getMonth() + 1; // Month is zero-based
  let year = date.getFullYear() % 100; // Get last two digits of the year
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return day + "." + month + "." + year + " " + hours + ":" + minutes;
}
