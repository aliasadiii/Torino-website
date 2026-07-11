const dateDetails = (startDate, endDate) => {
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const year = start.getFullYear();
  const monthNum = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  const month = persianMonths[monthNum - 1];

  const oneDay = 24 * 60 * 60 * 1000;
  const duration = Math.round((end - start) / oneDay);
  const nights = Math.round(Math.abs((end - start) / oneDay));
  const days = nights + 1;

  return {
    year,
    monthNum,
    month,
    day,
    duration,
    durationText: `${days} روز و ${nights} شب`,
  };
};

function getTransportationType(fleetVehicle) {
  switch (fleetVehicle) {
    case "bus":
      return "اتوبوس";
    case "van":
      return "ون";
    case "SUV":
      return "ماشین";
    case "airplane":
      return "پرواز";
    case "train":
      return "قطار";
    case "ship":
      return "کشتی";
    default:
      return "";
  }
}

function toShamsiDate(date) {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(new Date(date));

  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  const shamsiDate = `${day} ${month} ${year}`;

  return shamsiDate;
}

export { getTransportationType, dateDetails, toShamsiDate };
