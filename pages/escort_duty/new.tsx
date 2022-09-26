import DatePickerComponent from "@/components/DatePickerComp";
import SearchBox from "@/components/SearchBox";
import SelectedEscort from "@/components/SelectedEscort";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";
import { useEffect, useState } from "react";

export interface IStaff {
  id: string;
  name: string;
  designation: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NewEscortDuty() {
  const [staffs, setStaffs] = useState<IStaff[] | undefined>();
  const [selectedStaff, setSelectedstaff] = useState<IStaff[] | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [destination, setDestination] = useState<string | undefined>("");
  const [isLoading, setLoading] = useState(false);
  const [acknowledge, setAcknowledge] = useState<string | null | undefined>(
    null
  );
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetchStaffs();
    return () => setSelectedstaff(undefined);
  }, []);

  const fetchStaffs = async () => {
    const { data: staff, error } = await supabase
      .from("staff")
      .select(`id, name, designation`);

    if (error) {
      console.log(error.message);
      setError(true);
      setAcknowledge(error.message + " staff details");
    } else {
      setStaffs(staff);
    }
  };

  const onSubmitHandler = async (e: any) => {
    setLoading(true);

    if (selectedStaff?.length !== 3 && selectedStaff?.length !== 4) {
      setError(true);
      setAcknowledge("please select 3 or 4 staffs");
    } else if (destination === "") {
      setError(true);
      setAcknowledge("please select a valid destination");
    } else {
      fetch("/api/insert_escort_duty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          escort_at: startDate,
          destination,
          selectedStaff,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStaffs((prev) => prev && [...prev, ...selectedStaff]);
          setSelectedstaff(undefined);
          setStartDate(new Date());
          setDestination("");
          setError(false);
          setAcknowledge("submitted");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setAcknowledge("error");
        });
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Add new Escort</title>
      </Head>
      <main>
        <div className="text-2xl font-bold text-center">
          Add Escorting Details
        </div>
        <div className="flex justify-center ">
          <div className="m-2 w-full sm:w-3/4 md:w-2/3 xl:w-1/2  bg-orange-300 p-4 rounded-md shadow-md text-center">
            <div>
              Escort Date :{" "}
              <DatePickerComponent
                startdate={startDate}
                dateHandler={setStartDate}
              />
            </div>
            <div>
              <span className="capitalize">destination : </span>
              <div className="mb-3 xl:w-48 inline-block">
                <select
                  defaultValue={""}
                  className="appearance-none w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => setDestination(e.currentTarget.value)}
                >
                  <option value="" disabled>
                    Select Destination
                  </option>
                  <option value="KLNB">Khulna(KLNB)</option>
                  <option value="DHCA">Dhaca Cant(DHCA)</option>
                </select>
              </div>
            </div>
            {staffs !== undefined ? (
              <div>
                <SearchBox
                  items={staffs}
                  setSelectedhandler={setSelectedstaff}
                  setStaffHandler={setStaffs}
                />
              </div>
            ) : null}
            {selectedStaff !== undefined ? (
              <>
                <span className="text-stone-600 opacity-75 text-xs font-medium">
                  ~ {selectedStaff.length} staff selected ~
                </span>
                <SelectedEscort
                  selected={selectedStaff}
                  setStaffHandler={setStaffs}
                  setSelectedhandler={setSelectedstaff}
                />
              </>
            ) : null}
            <div>
              <button
                className={classNames(
                  isLoading
                    ? "bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded"
                    : "bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
                )}
                onClick={onSubmitHandler}
                disabled={isLoading ? true : false}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {acknowledge ? (
          <div
            className={classNames(
              isError
                ? "text-red-600 font-semibold text-center"
                : "text-green-600 font-semibold text-center"
            )}
          >
            {acknowledge}
          </div>
        ) : null}
      </main>
    </>
  );
}
