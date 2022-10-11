import Loader from "@/components/loader";
import { classNames, detailedDate } from "@/utils/functions";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Dollar_rate() {
  const [escortProgs, setEscortProgs] = useState<
    any[] | undefined | { id: string; destination: string; escort_at: string }[]
  >();

  useEffect(() => {
    fetchEscort();
  }, []);

  const fetchEscort = async () => {
    const { data: escort_prog, error } = await supabase
      .from("escort_prog")
      .select("id,destination,escort_at")
      .order("escort_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setEscortProgs(
        escort_prog.map((ep) => {
          return { ...ep, escort_at: detailedDate(ep.escort_at) };
        })
      );
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>Dollar Rate</title>
        </Head>
      </div>
      <main>
        <div className="text-2xl my-4 capitalize text-center">dollar rate</div>
        {/* body section */}
        {escortProgs == undefined ? (
          <Loader type="cubes" color="black" />
        ) : (
          <div className="container mx-auto md:w-2/3 lg:w-1/2 rounded-md shadow-md border-2 p-1">
            {escortProgs.map(
              (ep: { id: string; destination: string; escort_at: string }) => (
                <ListItemComp key={ep.id} escortProg={ep} />
              )
            )}
          </div>
        )}
      </main>
    </>
  );
}

const ListItemComp = ({
  escortProg,
}: {
  escortProg: { id: string; destination: string; escort_at: string };
}) => {
  const [isChecked, setChecked] = useState(false);
  const [isUpdatting, setUpdating] = useState(false);
  const [dollarRate, setDollarRate] = useState<any[]>();
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    if (isChecked) {
      fetchDollarRate();
    } else {
      setUpdating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const fetchDollarRate = async () => {
    const { data: dollar_rate, error } = await supabase
      .from("dolar_rate")
      .select("*")
      .eq("escort_prog_id", escortProg.id);

    if (error) {
      console.log(error);
    } else {
      setRate(dollar_rate[0]?.dolar_value);
      setDollarRate(dollar_rate);
    }
  };

  const onSubmitHandler = async () => {
    if (isNaN(rate)) {
      console.log("not valid");
    } else if (isUpdatting) {
      const { data, error } = await supabase
        .from("dolar_rate")
        .update({ dolar_value: rate })
        .eq("escort_prog_id", escortProg.id);

      if (error) {
        console.log(error);
      } else {
        fetchDollarRate();
      }
    } else {
      const { data, error } = await supabase
        .from("dolar_rate")
        .insert([{ escort_prog_id: escortProg.id, dolar_value: rate }])
        .select();

      if (error) {
        console.log(error);
      } else {
        fetchDollarRate();
      }
    }
    setUpdating(false);
  };

  return (
    <>
      {escortProg == undefined ? (
        <Loader type="cubes" color="black" />
      ) : (
        <div className="overflow-hidden">
          <div
            className="flex justify-between p-1 hover:cursor-pointer"
            onClick={() => setChecked((prev) => !prev)}
          >
            <div className="flex-auto">
              <span>{`On`}</span>{" "}
              <span className="italic font-semibold">
                {escortProg.escort_at}
              </span>{" "}
              <span className="italic font-semibold">
                {escortProg.destination}
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
                {dollarRate === undefined ? (
                  <Loader type="cubes" color="black" />
                ) : (
                  <>
                    {dollarRate?.length == 0 ? (
                      <InputSection
                        rate={rate}
                        ButtonHandler={onSubmitHandler}
                        rateHandler={setRate}
                      />
                    ) : (
                      <div>
                        <div className="flex justify-center items-center">
                          <div className="mr-2">
                            Dollar rate :{" "}
                            <span className="font-semibold italic">
                              {dollarRate[0].dolar_value}
                            </span>
                          </div>
                          <div onClick={() => setUpdating((prev) => !prev)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 hover:cursor-pointer hover:text-cyan-800"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </div>
                        </div>
                        {isUpdatting && (
                          <InputSection
                            rate={rate}
                            ButtonHandler={onSubmitHandler}
                            rateHandler={setRate}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const InputSection = ({
  rate,
  rateHandler,
  ButtonHandler,
}: {
  rate: number;
  rateHandler: Dispatch<SetStateAction<number>>;
  ButtonHandler: () => Promise<void>;
}) => {
  return (
    <div className="flex justify-center">
      <input
        className="mx-2 rounded-md py-1"
        type="number"
        placeholder="dollar rate in rupees"
        value={rate | 0}
        onChange={(e) => rateHandler(parseInt(e.target.value))}
      />
      <button
        className="bg-slate-500 text-white rounded-md px-4 py-1"
        onClick={ButtonHandler}
      >
        Submit
      </button>
    </div>
  );
};
