import { StaffI } from "@/utils/interfaces";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";

function Staff({ staff }: { staff: StaffI }) {
  return (
    <>
    <Head>
      <title>{staff.name}</title>
    </Head>
      <div className="text-2xl text-center capitalize">staff</div>
      <div className="flex justify-center">
        <div className="text-center drop-shadow-md bg-orange-300 p-4 mt-2 w-1/2 rounded-md shadow-md">
          <div className="text-2xl font-bold">Name : {staff.name}</div>
          <div>Designation : {staff.designation}</div>
          {staff.ticket == null ? null : (
            <div>ticket Number : {staff.ticket}</div>
          )}
        </div>
      </div>
    </>
  );
}

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
