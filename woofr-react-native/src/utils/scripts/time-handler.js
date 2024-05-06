export const calculateTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diff = now - postTime;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) {
    return "כרגע";
  } else if (seconds < 3600) {
    return `${minutes} דקות`;
  } else if (seconds < 86400) {
    return `${hours} שעות`;
  } else if (days === 1) {
    return "אתמול";
  } else if (days === 2) {
    return "לפני יומיים";
  } else if (days <= 7) {
    return `${days} ימים`;
  } else {
    const day = postTime.getDate();
    const month = postTime.getMonth() + 1;
    const year = postTime.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }
};
