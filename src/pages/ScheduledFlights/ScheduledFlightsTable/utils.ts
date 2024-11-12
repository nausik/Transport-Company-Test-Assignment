import { ScheduledFlight } from "../../../types";

export const calculateRoute = (flight: ScheduledFlight) =>
  `/orders/${flight.departureCity}/${flight.arrivalCity}/${flight.day}`;
