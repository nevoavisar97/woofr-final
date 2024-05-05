export const calculateTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diff = now - postTime;
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return "כרגע";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} דקות`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} שעות`;
  } else {
    const day = postTime.getDate();
    const month = postTime.getMonth() + 1;
    const year = postTime.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }
};
