export const calcTwoTimeDifference = (currentDate: Date, updatedDate: string) => {
  const updateTime = new Date(updatedDate);
  const diffMinutes = currentDate.getTime() - updateTime.getTime();
  const result = Math.abs(diffMinutes / (1000 * 60));

  if (result < 60) return `${result.toFixed()}분전`;
  else if (result < 1440) return `${(result / 60).toFixed()}시간 ${(result % 60).toFixed()}분전`;
  return `${(result / 1440).toFixed()}일 전`;
};

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (registeredDate: string) => {
  const date = new Date(registeredDate);
  return `${month[date.getMonth()]} ${date.getDate()}`;
};

export const isCorrectDate = (date: string) => {
  const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  return regex.test(date);
};

const leftPad = (value: number) => {
  if (value >= 10) return value;
  return `0${value}`;
};

export const getLocalDate = (dueDate?: string) => {
  if (!dueDate) return '';
  const date = new Date(dueDate);

  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join('-');
};
