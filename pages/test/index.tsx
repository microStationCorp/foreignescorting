import DatePickerComp from "@/components/DatePickerComp";
import { useState } from "react";

export default function Test() {
  const [startDate, setDate] = useState(new Date());
  const valid_date = [0, 2, 4, 5];
  return (
    <>
      <div>test page</div>
      <DatePickerComp startdate={startDate} dateHandler={setDate} />
      <div>
        {startDate.getDay()}:
        {startDate.toLocaleDateString("en-US", { weekday: "long" })}
      </div>
      <div>
        {valid_date.includes(startDate.getDay())
          ? `${startDate.toLocaleDateString("en-US", {
              weekday: "long",
            })} is valid`
          : `${startDate.toLocaleDateString("en-US", {
              weekday: "long",
            })} is invalid`}
      </div>
    </>
  );
}
