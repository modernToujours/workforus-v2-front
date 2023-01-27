const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formatedDate =
    year +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    day.toString().padStart(2, '0');

  const formatedTime =
    hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');

  return { date: formatedDate, time: formatedTime };
};

export default dateFormat;
