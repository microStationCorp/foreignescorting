import { classNames } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import Loader from "./loader";

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
        dollar_rate?: string;
      }[]
  >();

  useEffect(() => {
    if (isChecked) {
      fetchEscort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const fetchEscort = async () => {
    fetch("/api/get_program_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prog_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEscortStaff(data);
      });
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
            <span>{`On`}</span>{" "}
            <span className="italic font-semibold">{date}</span> to{" "}
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
          {isChecked && (
            <>
              {escort_staff == undefined ? (
                <div>
                  <Loader type="cubes" color="black" />
                </div>
              ) : (
                <div>
                  <ul>
                    {escort_staff.staffs?.map(
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
                  {escort_staff.dollar_rate ? (
                    <div>Dollar Rate : {escort_staff.dollar_rate}</div>
                  ) : (
                    <div className="flex items-center">
                      <span>
                        Dollar Rate :{" "}
                        <span className="text-red-400">Not Updated</span>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(AccordionComp);
