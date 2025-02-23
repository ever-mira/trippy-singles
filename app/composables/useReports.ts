import type { ExtendedReport } from "~~/types/extended.types"

const filter_drug_id = ref(null)

export function useReports() {
  const reports = useState<ExtendedReport[] | null>("TripReports", () => [])
  const report = useState<ExtendedReport | null>("LoadedReport", () => null)

  async function loadReports() {
    let url = "/api/reports/"
    if (filter_drug_id.value) url += `?drug_id=${filter_drug_id.value}`

    const { data } = await useFetch<ExtendedReport[]>(url, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) reports.value = data.value
  }

  function reset_drug_filter() {
    filter_drug_id.value = null
  }

  async function loadReport(id: string) {
    const { data } = await useFetch<ExtendedReport>(`/api/reports/${id}`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) report.value = data.value
  }

  return {
    reports,
    loadReports,
    filter_drug_id,
    reset_drug_filter,
    loadReport,
    report,
  }
}
