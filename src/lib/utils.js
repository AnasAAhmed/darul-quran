export const dateFormatter = (date, isTime = false) => {
  if(!date) return '';
  const formatterUS = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: isTime ? 'numeric' : undefined,
    minute: isTime ? 'numeric' : undefined
  });
  return formatterUS.format(new Date(date))
}