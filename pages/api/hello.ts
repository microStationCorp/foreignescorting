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

const ids = [
  "0ec0c70c-742d-4d6d-83c1-8dcfbe9e7883",
  "661dacc2-2896-47ed-8221-842b11fcb0ba",
  "010b6c2f-94e3-4910-958d-627490cf3ad3",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .filter("id", "in", `(${ids})`);
  if (error) console.log(error);
  else console.log(data);
  res.status(200).json({ name: "John Doe" });
}
