// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prog_id } = req.body;
  switch (req.method) {
    case "POST":
      {
        const { data, error } = await supabase
          .from("dolar_rate")
          .delete()
          .eq("escort_prog_id", prog_id);

        if (error) {
          res.status(500).json({ msg: error });
        } else {
          const { data, error } = await supabase
            .from("escort_staff")
            .delete()
            .eq("escort_program_id", prog_id);

          if (error) {
            res.status(500).json({ msg: error });
          } else {
            const { data, error } = await supabase
              .from("escort_prog")
              .delete()
              .eq("id", prog_id);

            if (error) {
              res.status(500).json({ msg: error });
            } else {
              res.status(200).json({success: true});
            }
          }
        }
      }
      break;
    default:
      res.status(405).json({ msg: "Method not allowed" });
  }
}
