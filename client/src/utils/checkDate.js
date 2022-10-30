import dayjs from "dayjs";

export const checkDueDate = (date) => {
  const getDate = dayjs(date);
  const difference = getDate.diff(Date.now(), "day");
  let text;
  if (difference < 0) {
    text = "Date is Over";
  } else if (difference === 0) {
    text = "Last Day";
  } else if (difference > 1) {
    text = `Due in ${difference} Days`;
  }
  return { difference, isOver: difference < 0, text, formattedDate: dayjs(getDate).format('LL'), formattedDateWithTime: dayjs(getDate).format('LLL') }
};

export const checkPassedDate = (date) => {
  const getDate = dayjs(date);
  const nowDate = dayjs(Date.now());
  const difference = nowDate.diff(getDate, "day");
  return { difference, isStated: difference > 0, text: (difference > 0 ? `Started ${difference} days ago ` : "Not Yet Started"), formattedDate: dayjs(getDate).format('LL'), formattedDateWithTime: dayjs(getDate).format('LLL') };
};

