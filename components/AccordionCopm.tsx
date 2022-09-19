import { supabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";
import Loader from "./loader";

function AccordionComp({ head, prog_id }: { head: string; prog_id: string }) {
  console.log("render accordin ~");

  const [isChecked, setChecked] = useState(false);
  const [escort_staff, setEscortStaff] = useState<
    | any
    | undefined
    | {
        id: string;
        staff: { name: string; designation: string; ticket: string };
      }[]
  >();

  useEffect(() => {
    console.log(isChecked, prog_id);
    if (isChecked) {
      fetchEscort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const fetchEscort = async () => {
    const { data: escort_staff, error } = await supabase
      .from("escort_staff")
      .select(`id,staff(name,designation,ticket)`)
      .eq("escort_program_id", prog_id);

    if (error) {
      console.log(error);
    } else {
      console.log(escort_staff);
      setEscortStaff(escort_staff);
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <label className=" hover:cursor-pointer">
          <input
            type="checkbox"
            className="absolute opacity-0 peer"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <p className="inline">{head}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block float-right mr-2 peer-checked:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>

          <div className="bg-gray-500 max-h-0 peer-checked:max-h-max">
            {escort_staff == undefined ? (
              <div>
                <Loader type="cubes" color="black" />
              </div>
            ) : (
              <ul>
                {escort_staff?.map(
                  (es: {
                    id: string;
                    staff: {
                      name: string;
                      designation: string;
                      ticket: string;
                    };
                  }) => (
                    <li key={es.id}>
                      {es.staff.name} ({es.staff.designation}
                      {es.staff.ticket ? `/${es.staff.ticket}` : null})
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </label>
      </div>
    </>
  );
}

export default React.memo(AccordionComp);
