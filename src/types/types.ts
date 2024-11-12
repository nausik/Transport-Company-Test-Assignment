/**
 * This folder contains files, that are shared across the app
 * All types in a single file, cause there's pretty much only two types available
 */

export type Airport = "YYZ" | "YUL" | "YYC" | "YVR";

export interface ScheduledFlight {
  flightNumber: number;
  day: number;
  arrivalCity: Airport;
  departureCity: Airport;
}

export interface DailyScheduledFlights {
  day: number;
  flights: ScheduledFlight[];
}

export interface FlightWithOrders {
  flight: ScheduledFlight | null;
  orders: string[];
}

export type OrdersByDestination = Record<Airport, FlightWithOrders[]>;