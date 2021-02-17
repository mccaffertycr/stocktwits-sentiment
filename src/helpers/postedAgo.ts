export const postedAgo = (createdAt: string): any => {
  const createdDate = new Date(parseInt(createdAt));
  const currentDate = new Date();

  const hours = diffHours(currentDate, createdDate);

  let mins;
  let days;

  if (hours < 1) {
    mins = diffMins(currentDate, createdDate);
  }

  if (hours > 24) {
    days = diffDays(currentDate, createdDate);
  }

  if (mins) {
    return mins > 1
    ? mins + ' minutes ago'
    : mins + ' minute ago';
  }

  if (days) {
    return days > 1
      ? days + ' days ago'
      : days + ' day ago';
  }

  return hours > 1
  ? hours + ' hours ago'
  : hours + ' hour ago';
};

function diffHours(current: Date, created: Date) {
  let diff = (current.getTime() - created.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

function diffMins(current: Date, created: Date) {
  let diff = (current.getTime() - created.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

function diffDays(current: Date, created: Date) {
  const oneDay = 1000 * 60 * 60 * 24;
  const diff = current.getTime() - created.getTime();
  return Math.abs(Math.round(diff / oneDay));
}
