// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

type staff = {
  id: string;
  created_at: string;
  name: string;
  designation: string;
  ticket: number;
  escort_prog_id: null | string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { escort_at, destination, selectedStaff } = req.body;
  switch (req.method) {
    case "POST":
      {
        const { data, error } = await supabase
          .from("escort_prog")
          .select("*")
          .eq("escort_at", new Date(escort_at).toLocaleDateString("af-ZA"));

        if (data?.length !== 0) {
          res.json({ success: false, msg: "this date is pre occupied" });
        } else {
          const { data: escort_prog, error } = await supabase
            .from("escort_prog")
            .insert([{ escort_at, destination }])
            .select()
            .single();

          if (error) {
            res.status(500).json({ msg: error });
          } else if (escort_prog) {
            const { data: escorted_staff, error } = await supabase
              .from("escort_staff")
              .insert(
                selectedStaff?.map(
                  (ss: { id: string; name: string; destination: string }) => ({
                    escort_program_id: escort_prog.id,
                    staff_id: ss.id,
                  })
                )
              )
              .select();

            if (error) {
              res.status(500).json({ msg: error });
            } else if (escorted_staff) {
              res.status(200).json({ success: true });
            }
          }
        }
      }
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
