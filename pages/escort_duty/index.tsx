import AccordionComp from "@/components/AccordionCopm";
import Loader from "@/components/loader";
import { supabase } from "@/utils/supabaseClient";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const EscortDuty: NextPage = () => {
  const [escort_prog, setEscortProg] = useState<any[] | undefined>();

  useEffect(() => {
    fetchEscort();
  }, []);

  const fetchEscort = async () => {
    const { data: escort_prog, error } = await supabase
      .from("escort_prog")
      .select(`*`);

    if (error) {
      console.log(error);
    } else {
      setEscortProg(escort_prog);
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

      {escort_prog == undefined ? (
        <div>
          <Loader type="cubes" color="black" />
        </div>
      ) : (
        <div className="shadow-md w-full md:w-2/3 mx-auto mt-4">
          {escort_prog?.map((ep) => (
            // accordin
            <AccordionComp
              key={ep.id}
              prog_id={ep.id}
              head={`On ${new Date(ep.escort_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })} to ${ep.destination}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default EscortDuty;
