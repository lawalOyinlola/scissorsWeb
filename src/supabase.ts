import { createClient, Session } from "@supabase/supabase-js";

const supabaseUrl = "https://zizgoedwnoegqzjpsihj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppemdvZWR3bm9lZ3F6anBzaWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MzI4NDIsImV4cCI6MjAyNTMwODg0Mn0.u4K5blEI_u6gMJW5mHgIiGIDu9FWUwcoXijUP0lcC8o";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getSession = async (): Promise<Session | null> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }
    const session = data?.session;

    return session ?? null;
  } catch (error) {
    console.error("User not logged in", (error as Error).message);
    return null;
  }
};
