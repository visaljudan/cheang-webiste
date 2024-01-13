import { format } from "date-fns";
const FormatDate = (date) => {
  return format(date, "dd MMM yy");
};

export default FormatDate;
