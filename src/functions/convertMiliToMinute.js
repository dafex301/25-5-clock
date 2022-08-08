export const convertMiliToMinute = (mili, type) => {
  const minute = Math.floor(mili / 60000);
  const second = Math.floor((mili % 60000) / 1000);
  if (type === 'minute') 
  return `${minute}`;
  else
  return `${minute}:${second < 10 ? '0' : ''}${second}`;
}