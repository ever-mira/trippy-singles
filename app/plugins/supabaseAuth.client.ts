import { useUser } from "~/composables/useUser";

export default defineNuxtPlugin(() => {
  const { fetchUsername, clearUsername } = useUser();
  const supabase = useSupabaseClient();

  let lastUserId: string | null = null;

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      if (session.user.id !== lastUserId) {
        lastUserId = session.user.id;
        await fetchUsername();
      }
    } else if (event === "SIGNED_OUT") {
      clearUsername();
    }
  });
});
