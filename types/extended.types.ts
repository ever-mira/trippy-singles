import type { Tables } from "~~/types/database.types"
type Report = Tables<"trip_reports">

export type ExtendedReport = Report & {
  profiles: {
    username: string
  }
  drugs: {
    name: string
  }
  formattedDate: string
}
