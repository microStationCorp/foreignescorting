import React, { Dispatch, SetStateAction } from "react";

function DatePickerComponent({
  startdate,
  dateHandler,
}: {
  startdate: Date;
  dateHandler: Dispatch<SetStateAction<Date>>;
}) {
  return (
    <input
      type="date"
      id="escort_date"
      name="escort_date"
      value={startdate.toLocaleDateString("af-ZA")}
      onChange={(e) => {
        dateHandler(new Date(e.currentTarget.value));
      }}
    />
  );
}

export default React.memo(DatePickerComponent);
