import { backendUrl } from "../config";
import { Airport, DailyScheduledFlights, OrdersByDestination } from "../types";

const fetchJson = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response;
};

export const fetchScheduledFlights = async (): Promise<
  DailyScheduledFlights[]
> => {
  const url = `${backendUrl}/scheduled-flights`;

  const response = await fetchJson(url);
  return response.json();
};

export const fetchAllOrders = async (): Promise<OrdersByDestination> => {
  const url = `${backendUrl}/orders`;

  const response = await fetchJson(url);

  return response.json();
};

export const fetchOrdersByFlight = async (
  departure: Airport,
  arrival: Airport,
  day: number
): Promise<OrdersByDestination>  => {
  const url = `${backendUrl}/orders/${departure}/${arrival}/${day}`;

  const response = await fetchJson(url);

  return response.json();
};
