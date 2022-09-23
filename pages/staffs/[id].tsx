import Loader from "@/components/loader";
import { StaffI } from "@/utils/interfaces";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
    | any[]
    | {
        staff: {
          id: string;
          name: string;
          designation: string;
          ticket: string;
        };
      }[]
    | undefined
  >();

  useEffect(() => {
    if (isChecked) {
      fetchCoEscort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const fetchCoEscort = async () => {
    const { data, error } = await supabase
      .from("escort_staff")
      .select("staff(id,name,designation,ticket)")
      .eq("escort_program_id", staffData?.escort_prog.id)
      .neq("staff_id", staffId);

    if (error) console.log(error);
    else {
      setCoescort(data);
    }
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
                {new Date(staffData.escort_prog.escort_at).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
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
            {coEscort == undefined ? (
              <div>
                <Loader type="cubes" color="black" />
              </div>
            ) : (
              <ul>
                {coEscort?.map(
                  (es: {
                    staff: {
                      id: string;
                      name: string;
                      designation: string;
                      ticket: string;
                    };
                  }) => (
                    <li key={es.staff.id}>
                      {es.staff.name} ({es.staff.designation}
                      {es.staff.ticket ? `/${es.staff.ticket}` : null})
                    </li>
                  )
                )}
              </ul>
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
