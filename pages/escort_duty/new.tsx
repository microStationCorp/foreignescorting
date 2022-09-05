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

export default function NewEscortDuty() {
  const [staffs, setStaffs] = useState<IStaff[] | undefined>();
  const [selectedStaff, setSelectedstaff] = useState<IStaff[] | undefined>();

  useEffect(() => {
    fetchStaffs();

    return () => setSelectedstaff(undefined);
  }, []);

  const fetchStaffs = async () => {
    const { data: staff, error } = await supabase
      .from("staff")
      .select(`id, name, designation`);

    if (error) {
      console.log(error);
    } else {
      setStaffs(staff);
    }
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
          <div className="m-2 w-1/2 bg-orange-300 p-4 rounded-md shadow-md">
            <div>
              <span className="capitalize">destination : </span>
              <input type="text" placeholder="Enter Destination" />
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
              <button>Submit</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
