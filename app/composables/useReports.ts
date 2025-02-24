import type { ExtendedReport, ExtendedReportComment } from "~~/types/extended.types"

const filter_drug_id = ref(null)

export function useReports() {
  const reports = useState<ExtendedReport[] | null>("TripReports", () => [])
  const report = useState<ExtendedReport | null>("LoadedReport", () => null)
  const reportComments = useState<Array<ExtendedReportComment> | null>("ReportComments", () => [])

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
    await loadComments(id)
  }

  async function loadComments(id: string) {
    const { data } = await useFetch<Array<ExtendedReportComment>>(`/api/reports/${id}/comments`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) reportComments.value = data.value
  }

  async function saveComment(report_id: string, text: string) {
    await useFetch(`/api/reports/${report_id}/comments`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({ text }),
    })
    await loadComments(report_id)
  }

  return {
    reports,
    loadReports,
    filter_drug_id,
    reset_drug_filter,
    loadReport,
    report,
    loadComments,
    saveComment,
    reportComments,
  }
}
