export const calcTwoTimeDifference = (currentDate: Date, updatedDate: string) => {
  const updateTime = new Date(updatedDate);
  const diffMinutes = currentDate.getTime() - updateTime.getTime();
  const result = Math.abs(diffMinutes / (1000 * 60));

  if (result < 60) return `${result.toFixed()}분전`;
  else if (result < 1440) return `${(result / 60).toFixed()}시간 ${(result % 60).toFixed()}분전`;
  return `${(result / 1440).toFixed()}일 전`;
}

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (registeredDate: string) => {
  const date = new Date(registeredDate);
  return `${month[date.getMonth()]} ${date.getDate()}`;
}
