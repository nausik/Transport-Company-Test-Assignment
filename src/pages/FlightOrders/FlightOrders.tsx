import "./FlightOrders.scss";

import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchAllOrders, fetchOrdersByFlight } from "../../services";
import { Airport } from "../../types";
import { FlightOrdersTable } from "./FlightOrdersTable/FlightOrdersTable";
import { getFlightSectionTitle } from "./utlis";

export const FlightOrders = () => {
  const { departure, arrival, day } = useParams();

  /**
   * Resolve Service to fetch data, based on the presence of URL params
   * fetch specific orders if params are present
   * fetch ALL of them otherwise
   */
  const cbFunction = () =>
    departure && arrival && day
      ? () =>
          fetchOrdersByFlight(
            departure as Airport,
            arrival as Airport,
            Number(day)
          )
      : () => fetchAllOrders();

  const { isLoading, data = [] } = useQuery({
    queryKey: ["orders", departure, arrival, day],
    queryFn: cbFunction(),
  });

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  const destinations = Object.entries(data);

  return (
    <div>
      {destinations.map(([destination, flights = []]) => (
        <section key={destination} className="destination-section">
          <Typography variant="h6" component="div">
            Orders to {destination}
          </Typography>

          {flights.map((flight) => (
            <div className="flight-section" key={flight.orders[0]}>
              <Typography variant="h6" component="div">
                {getFlightSectionTitle(flight.flight)}
              </Typography>
              <FlightOrdersTable flightWithOrders={flight}></FlightOrdersTable>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
