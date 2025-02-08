import type { Tables } from "~~/types/database.types"
type Report = Tables<"trip_reports">

const filter_drug_id = ref(null)

export function useReports() {
  const reports = useState<Report[] | null>("reports", () => null)

  async function loadReports() {
    let url = "/api/reports/"
    if (filter_drug_id.value) url += `?drug_id=${filter_drug_id.value}`

    const { data } = await useFetch<Report[]>(url, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) reports.value = data.value
  }

  function reset_drug_filter() {
    filter_drug_id.value = null
  }

  return {
    reports,
    loadReports,
    filter_drug_id,
    reset_drug_filter,
  }
}
