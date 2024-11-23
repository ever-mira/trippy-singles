import type { QueryData } from "@supabase/supabase-js";
import type { Database } from "../../types/database.types";

export function useUserList() {
  const supabase = useSupabaseClient<Database>();

  const query = supabase.from("profiles").select("id, username, avatar_url");
  const users = useState<QueryData<typeof query> | undefined | null>("users", () => null);

  async function fetchUsers() {
    const { data } = await useAsyncData("users", executeQuery);
    users.value = data.value;
  }

  async function executeQuery() {
    const { data, error } = await query;

    if (error) {
      throw new Error("Fehler beim Laden der User: " + error.message);
    }

    return data;
  }

  return {
    users,
    fetchUsers,
  };
}
