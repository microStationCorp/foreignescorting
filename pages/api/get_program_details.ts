// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

type DATAI = {
  id: string;
  staff: { name: string; designation: string; ticket: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prog_id } = req.body;
  switch (req.method) {
    case "POST":
      {
        const { data: escort_staff, error } = await supabase
          .from("escort_staff")
          .select(`id,staff(name,designation,ticket)`)
          .eq("escort_program_id", prog_id)

        if (error) {
          res.status(500).json({ msg: error });
        } else if (escort_staff) {
          const { data: dollar_rate, error } = await supabase
            .from("dolar_rate")
            .select("*")
            .eq("escort_prog_id", prog_id);

          if (error) {
            res.status(500).json({ msg: error });
          } else if (dollar_rate.length === 0) {
            res.status(200).json({
              staffs:escort_staff,
            });
          } else {
            res.status(200).json({
              staffs:escort_staff,
              dollar_rate: dollar_rate[0].dolar_value,
            });
          }
        }
      }
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
