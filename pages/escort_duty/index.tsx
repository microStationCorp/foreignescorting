import Loader from "@/components/loader";
import { supabase } from "@/utils/supabaseClient";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const EscortDuty: NextPage = () => {
  const [escort, setEscort] = useState<any[] | undefined>();

  useEffect(() => {
    fetchEscort();
  }, []);

  const fetchEscort = async () => {
    const { data: escort, error } = await supabase
      .from("escort")
      .select(
        `*,staff_1(name,designation),staff_2(name,designation),staff_3(name,designation),staff_4(name,designation)`
      );

    if (error) {
      console.log(error);
    } else {
      setEscort(escort);
    }
  };
  return (
    <>
      <Head>
        <title>Escort Duty</title>
      </Head>
      <div className="text-2xl text-center capitalize">escort duty</div>
      <div className="bg-sky-600 hover:bg-sky-500 hover:shadow-md inline-block p-2 ml-3 text-white rounded-md">
        <Link href="/escort_duty/new">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="pt-2">Add New</span>
          </a>
        </Link>
      </div>
      {escort == undefined ? (
        <div>
          <Loader type="cubes" color="black" />
        </div>
      ) : (
        <ol className="flex justify-center">
          {escort?.map((es) => (
            <div
              key={es.id}
              className="text-center drop-shadow-md bg-orange-300 p-4 mt-2 w-1/2 rounded-md shadow-md"
            >
              <li>
                <div>Escort on : {new Date(es.escort_at).toDateString()}</div>
                <div className="capitalize">destination : {es.destination}</div>
                <div>
                  <div className="text-lg capitalize font-medium">
                    staff 1 : {es.staff_1.name} ({es.staff_1.designation})
                  </div>
                  <div className="text-lg capitalize font-medium">
                    staff 2 : {es.staff_2.name} ({es.staff_2.designation})
                  </div>
                  <div className="text-lg capitalize font-medium">
                    staff 3 : {es.staff_3.name} ({es.staff_3.designation})
                  </div>
                  {es.staff_4 !== null ? (
                    <div className="text-lg capitalize font-medium">
                      staff 4 : {es.staff_4.name} ({es.staff_4.designation})
                    </div>
                  ) : null}
                </div>
              </li>
            </div>
          ))}
        </ol>
      )}
    </>
  );
};

export default EscortDuty;
