export const formattedTime = (time24: string) => {
  const [hours, minutes] = time24.split(":");
  const hour = Number.parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${period}`;
};

export const formattedDate = (date: Date) => {
  const convertDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return convertDate;
};

export const checkDate = (date1: Date, date2: Date) => {
  const areSameDate =
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  return areSameDate;
};
