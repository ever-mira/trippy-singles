import type { Tables } from "~~/types/database.types"
type Report = Tables<"trip_reports">
type ReportComment = Tables<"trip_report_comments">

export type ExtendedReport = Report & {
  profiles: {
    username: string
  }
  drugs: {
    name: string
  }
  formattedDate: string
}

export type ExtendedComment = ReportComment & {
  profiles: {
    username: string
    avatar_url: string
  }
}

type Profile = Tables<"profiles">

export type ProfileWithDistance = Profile & {
  distance?: number
}
