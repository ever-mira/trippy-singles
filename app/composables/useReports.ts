import type { ExtendedReport } from "~~/types/extended.types"

const drugFilter = ref(null)
const longTermFilter = ref("with")

export function useReports() {
  const reports = useState<ExtendedReport[] | null>("TripReports", () => [])
  const report = useState<ExtendedReport | null>("LoadedReport", () => null)

  async function loadReports() {
    const params = new URLSearchParams({
      long_term: longTermFilter.value,
    })

    if (drugFilter.value) params.append("drug_id", drugFilter.value)

    const { data } = await useFetch<ExtendedReport[]>("/api/reports/?" + params.toString(), {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) reports.value = data.value
  }

  function resetDrugFilter() {
    drugFilter.value = null
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
    drugFilter,
    resetDrugFilter,
    longTermFilter,
    loadReport,
    report,
  }
}
