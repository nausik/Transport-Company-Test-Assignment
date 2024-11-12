import "./ScheduledFlights.scss";

import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { fetchScheduledFlights } from "../../services";
import { ScheduledFlightsTable } from "./ScheduledFlightsTable";

export const ScheduledFlights = () => {
  const {
    isLoading,
    isError,
    data = [],
  } = useQuery({
    queryKey: ["scheduled_flights"],
    queryFn: fetchScheduledFlights,
  });

  if (isLoading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  return (
    <>
      {!isError &&
        data.map((group) => (
          <section key={group.day} className="scheduled-flights-section">
            <Typography variant="h6" component="div">
              Scheduled Flights for day {group.day}
            </Typography>
            <ScheduledFlightsTable
              flights={group.flights}
            ></ScheduledFlightsTable>
          </section>
        ))}
    </>
  );
};
