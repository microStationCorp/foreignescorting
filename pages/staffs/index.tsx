import Loader from "@/components/loader";
import { StaffI } from "@/utils/interfaces";
import { supabase } from "@/utils/supabaseClient";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Staffs: NextPage = () => {
  const [staffs, setStaffs] = useState<StaffI[] | undefined>();

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStaff = async () => {
    let { data: staff, error } = await supabase.from("staff").select("*");
    if (error) console.log(error);
    else setStaffs(staff);
  };

  return (
    <>
      <div>
        <Head>
          <title>Staff page</title>
        </Head>
      </div>
      {staffs == undefined ? (
        <main>
          <Loader type="cubes" color="black" />
        </main>
      ) : (
        <main>
          <div className="text-2xl capitalize">staffs</div>
          <ol>
            {staffs?.map((st) => (
              <div key={st.id}>
                <li>
                  <div>name:{st.name}</div>
                  <div>designation:{st.designation}</div>
                  {st.ticket !== null ? (
                    <div>ticket number:{st.ticket}</div>
                  ) : null}
                  <div>
                    <Link href={`/staffs/${st.id}`} passHref>
                      <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                        go to
                      </a>
                    </Link>
                  </div>
                </li>
                <hr />
              </div>
            ))}
          </ol>
        </main>
      )}
    </>
  );
};

export default Staffs;
