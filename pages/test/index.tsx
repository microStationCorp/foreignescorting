import DatePickerComp from "@/components/DatePickerComp";
import { checkValidCombination } from "@/utils/functions";
import { useState } from "react";
const data = {
  KLNB: [0, 4],
  DHCA: [2, 5],
};

export default function Test() {
  const [startDate, setDate] = useState(new Date());
  const [dest, setDestination] = useState("");
  const valid_date = [0, 2, 4, 5];
  return (
    <>
      <div>test page</div>
      <div>
        <div className="mb-3 xl:w-48 inline-block">
          <select
            defaultValue={""}
            onChange={(e) => setDestination(e.currentTarget.value)}
          >
            <option value="" disabled>
              Select Destination
            </option>
            <option value="KLNB">13129/13130 Khulna(KLNB)</option>
            <option value="DHCA">13109/13110 Dhaca Cant(DHCA)</option>
          </select>
        </div>
      </div>

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
      <div>
        {checkValidCombination({ dest, dateNum: startDate.getDay() })
          ? "valid"
          : "invalid"}
      </div>
    </>
  );
}
