import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.API_KEY as string
);

// Upload file using standard upload
export async function uploadFile(file: File, id: string) {
  const { data, error } = await supabase.storage
    .from("turbo-typer-images")
    .upload(`${id}/${file}`, file);
  if (error) {
    console.log(error, "HERE IS THE ERROR");
  } else {
    return data;
  }
}
