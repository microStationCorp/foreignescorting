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
        <main className="container mx-auto px-4 md:w-2/3 lg:w-1/2">
          <div className="text-3xl mt-4 capitalize text-center">
            Total staffs
          </div>
          <div className="rounded-md shadow-md border-2 p-1">
            <ol className="p-2">
              {staffs?.map((st) => (
                <div key={st.id}>
                  <li className="flex justify-between p-1 hover:bg-slate-200">
                    <div className="flex-auto">
                      <span className="capitalize text-xl">{st.name}(</span>
                      <span className="capitalize text-xl italic">
                        {st.designation}
                        {st.ticket ? `/${st.ticket}` : null}
                      </span>
                      <span className="capitalize text-xl">)</span>
                    </div>
                    <div>
                      <Link href={`/staffs/${st.id}`} passHref>
                        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </li>
                  <hr />
                </div>
              ))}
            </ol>
          </div>
        </main>
      )}
    </>
  );
};

export default Staffs;
