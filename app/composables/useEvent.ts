import type { Tables } from "~~/types/database.types"
type Event = Tables<"events">
import { format } from "date-fns"
import { de } from "date-fns/locale"

export default function useEvent() {
  const event = useState<Event | null>("event", () => null)

  const loadEvent = async (id: string) => {
    event.value = null

    const { data } = await useFetch<Event>(`/api/events/${id}`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })

    if (data.value) {
      event.value = data.value
    }
  }

  const eventDate = computed(() => {
    if (event.value?.date) {
      return new Date(event.value?.date)
    }
  })

  const eventDateFormatted = computed(() => {
    if (eventDate.value) {
      return format(eventDate.value, "EEEE, d. MMMM yyyy 'um' HH:mm", { locale: de })
    }
  })

  return {
    event,
    loadEvent,
    eventDate,
    eventDateFormatted,
  }
}
