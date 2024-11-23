import type { QueryData } from "@supabase/supabase-js";
import type { Database } from "../../types/database.types";

export function useUserList() {
  const supabase = useSupabaseClient<Database>();

  const query = supabase.from("profiles").select("id, username, avatar_url");
  const users = useState<QueryData<typeof query> | undefined | null>("users", () => null);

  async function fetchUsers() {}

  return {
    users,
    fetchUsers,
  };
}
