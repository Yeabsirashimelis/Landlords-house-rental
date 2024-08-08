import { format } from "date-fns";

export function formatDate(theDate) {
  const formattedDate = format(theDate, "MMMM do, yyyy");
  return formattedDate;
}
