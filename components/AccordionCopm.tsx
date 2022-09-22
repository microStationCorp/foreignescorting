import { supabase } from "@/utils/supabaseClient";
import React, { useEffect, useState } from "react";
import Loader from "./loader";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function AccordionComp({
  prog_id,
  date,
  destination,
}: {
  prog_id: string;
  date: string;
  destination: string;
}) {
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
      setEscortStaff(escort_staff);
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          className="hover:cursor-pointer flex justify-between p-2 ml-2"
          onClick={() => setChecked((prev) => !prev)}
        >
          <p className="flex-auto">
            {" "}
            <span>{`On`}</span> <span className="italic font-semibold">{date}</span> to{" "}
            <span className="italic font-semibold">{destination}</span>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 mr-2 flex-none ${classNames(
              isChecked ? "rotate-180" : ""
            )}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div
          className={`bg-gray-300 rounded-md ${classNames(
            isChecked ? "max-h-min p-4 mx-4" : "max-h-0"
          )}`}
        >
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
      </div>
    </>
  );
}

export default React.memo(AccordionComp);
