import Loader from "@/components/loader";
import { classNames, detailedDate } from "@/utils/functions";
import { StaffI } from "@/utils/interfaces";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";
import { useEffect, useState } from "react";

function Staff({ staff }: { staff: StaffI }) {
  const [staffDetail, setStaffdetail] = useState<any[] | undefined>();

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContent = async () => {
    let { data: escort_data, error } = await supabase
      .from("escort_staff")
      .select(`id,escort_prog(id,destination,escort_at)`)
      .eq("staff_id", staff.id)
      .order(`escort_at`, { foreignTable: "escort_prog" });

    if (error) console.log(error);
    else {
      setStaffdetail(escort_data);
    }
  };

  return (
    <>
      <Head>
        <title>{staff.name}</title>
      </Head>
      <main>
        {/* header section */}
        <div className="text-center m-4">
          <span className="capitalize text-2xl">{staff.name}(</span>
          <span className="capitalize text-xl italic">
            {staff.designation}
            {staff.ticket ? `/${staff.ticket}` : null}
          </span>
          <span className="capitalize text-2xl">)</span>
        </div>
        {/* body section */}
        <div className="container mx-auto md:w-2/3 lg:w-1/2 rounded-md shadow-md border-2 p-1">
          {staffDetail == undefined ? (
            <Loader type="cubes" color="black" />
          ) : (
            <>
              {staffDetail?.map((sd) => (
                <ListItemComp key={sd.id} staffData={sd} staffId={staff.id} />
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

const ListItemComp = ({
  staffData,
  staffId,
}: {
  staffData: { id: string; escort_prog: any } | undefined;
  staffId: string;
}) => {
  const [isChecked, setChecked] = useState(false);
  const [coEscort, setCoescort] = useState<
    | {
        staffs: {
          staff: {
            id: string;
            name: string;
            designation: string;
            ticket: string;
          };
        }[];
        dollar_rate: number;
      }
    | undefined
  >();

  useEffect(() => {
    if (isChecked) {
      fetchCoEscort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const fetchCoEscort = async () => {
    fetch("/api/get_staff_prog_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prog_id: staffData?.escort_prog.id,
        staff_id: staffId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCoescort(data);
      })
      .catch((err) => console.log(err));

  };

  return (
    <div>
      {staffData == undefined ? (
        <Loader type="cubes" color="black" />
      ) : (
        <div className="overflow-hidden p-1">
          <div
            key={staffData.id}
            className="flex justify-between  p-1 hover:cursor-pointer"
            onClick={() => setChecked((prev) => !prev)}
          >
            <div className="flex-auto">
              {" "}
              <span>{`On`}</span>{" "}
              <span className="italic font-semibold">
                {detailedDate(staffData.escort_prog.escort_at)}
              </span>{" "}
              to{" "}
              <span className="italic font-semibold">
                {staffData.escort_prog.destination}
              </span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isChecked ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                )}
              </svg>
            </div>
          </div>
          <div
            className={`bg-gray-300 rounded-md ${classNames(
              isChecked ? "max-h-min p-4 mx-4" : "max-h-0"
            )}`}
          >
            {isChecked && (
              <>
                {coEscort === undefined ? (
                  <div>
                    <Loader type="cubes" color="black" />
                  </div>
                ) : (
                  <div>
                    <ul>
                      {coEscort.staffs?.map(
                        (es: {
                          staff: {
                            id: string;
                            name: string;
                            designation: string;
                            ticket?: string;
                          };
                        }) => (
                          <li key={es.staff.id}>
                            {es.staff.name} ({es.staff.designation}
                            {es.staff.ticket ? `/${es.staff.ticket}` : null})
                          </li>
                        )
                      )}
                    </ul>
                    {coEscort.dollar_rate ? (
                      <div>Dollar Rate : {coEscort.dollar_rate}</div>
                    ) : (
                      <div className="flex items-center">
                        <span>Dollar Rate : <span className="text-red-400">Not Updated</span></span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  let { data: staff, error } = await supabase
    .from("staff")
    .select("*")
    .eq("id", context.params.id)
    .single();

  return {
    props: { staff },
  };
}
export default Staff;
