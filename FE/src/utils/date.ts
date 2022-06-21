export const calcTwoTimeDifference = (updatedDateTime: Date) => {
  const currentTime = new Date();
  const updateTime = new Date(updatedDateTime);
  const diffMinutes = currentTime.getTime() - updateTime.getTime();
  const result = Math.abs(diffMinutes / (1000 * 60));

  if (result < 60) return `${result.toFixed()}분전`;
  else if (result < 1440) return `${(result / 60).toFixed()}시간 ${(result % 60).toFixed()}분전`;
  return `${(result / 1440).toFixed()}일 전`;
}
