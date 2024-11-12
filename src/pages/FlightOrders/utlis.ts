import { ScheduledFlight } from "../../types";

export const getFlightSectionTitle = (flight: ScheduledFlight | null) => {
  return flight?.flightNumber
    ? `Flight ${flight?.flightNumber}`
    : "Unassigned Flight";
};
