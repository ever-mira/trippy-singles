import type Country from "./country"
import type OsmLocation from "./osmLocation"

export default interface LocationData {
  country: Country
  location: OsmLocation
}
