export const formatDate = (date: string | Date | undefined | null): string => {
  if (!date) {
    return 'Unknown Date';
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return 'Unknown Date';
  }

  return parsedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
};
