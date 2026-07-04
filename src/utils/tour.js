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
  const date = new Date(startDate);
  const end = new Date(endDate);
  const year = date.getFullYear();
  const monthNum = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const month = persianMonths[monthNum - 1];
  const oneDay = 24 * 60 * 60 * 1000;
  const duration = Math.round((end - date) / oneDay);

  return { year, monthNum, month, day, duration };
};

function getTransportationType(fleetVehicle) {
  switch (fleetVehicle) {
    case "bus":
      return "اتوبوس";
    case "van":
      return "ون";
    case "SUV":
      return "ماشین(suv)";
    case "airplane":
      return "پرواز";
    case "train":
      return "قطار";
    case "ship":
      return "دریایی";
    default:
      return "";
  }
}
export { getTransportationType, dateDetails };
