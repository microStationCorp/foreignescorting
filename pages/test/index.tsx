import DatePickerComp from "@/components/DatePickerComp";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

export default function Test() {
  const [startDate, setDate] = useState(new Date());
  const dateSearch = async () => {
    console.log(startDate);
    const { data, error } = await supabase
      .from("escort_prog")
      .select("*")
      .eq("escort_at", startDate.toLocaleDateString("af-ZA"));
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  };
  return (
    <>
      <div>test page</div>

      <DatePickerComp startdate={startDate} dateHandler={setDate} />
      <div>
        {startDate.getDay()}:
        {startDate.toLocaleDateString("en-US", { weekday: "long" })}
      </div>

      <button onClick={dateSearch}>search</button>
    </>
  );
}
