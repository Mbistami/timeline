export const mergeStyles = (arr) => arr.join(" ");
export const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const pad = (num, places) => {
  const numZeroes = places - num.toString().length + 1;
  if (numZeroes >= 0) {
    return Array(+numZeroes).join("0") + num;
  }
  console.log(numZeroes, "0" + num);
  return num;
};
