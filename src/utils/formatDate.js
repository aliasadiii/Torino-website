const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertToPersianDateTime = (dateInput, withTime = false) => {
  if (!dateInput) return "---";

  try {
    let date;

    if (
      typeof dateInput === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
    ) {
      const [year, month, day] = dateInput.split("-").map(Number);
      date = new Date(Date.UTC(year, month - 1, day));
    } else {
      date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return "---";

    const datePart = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    if (!withTime) return datePart;

    const timePart = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${timePart} - ${datePart}`;
  } catch (error) {
    return "---";
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export { formatDate, convertToPersianDateTime, formatTime };
