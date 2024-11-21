export function useUser() {
  const username = useState<string | null>("username", () => null);

  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();

  async function fetchUsername() {
    if (!supabaseUser.value) {
      username.value = null;
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", supabaseUser.value.id)
        .single();

      if (error) throw error;
      username.value = data?.username || null;
    } catch (err) {
      username.value = null;
    }
  }

  function clearUsername() {
    username.value = null;
  }

  return {
    username,
    fetchUsername,
    clearUsername,
  };
}
