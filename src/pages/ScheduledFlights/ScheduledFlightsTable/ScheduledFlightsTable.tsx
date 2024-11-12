import "./ScheduledFlightsTable.scss";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { scheduledFlightsTableCols } from "./consts";
import { ScheduledFlightsTableProps } from "./types";
import { calculateRoute } from "./utils";

export const ScheduledFlightsTable = ({
  flights = [],
}: ScheduledFlightsTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {scheduledFlightsTableCols.map((column) => (
              <TableCell key={column.id}>
                <span className="column-header">{column.label}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.flightNumber} data-testid="flight-info-row">
              <TableCell className="column-content">
                {flight.flightNumber}
              </TableCell>
              <TableCell className="column-content">
                {flight.departureCity}
              </TableCell>
              <TableCell className="column-content">
                {flight.arrivalCity}
              </TableCell>
              <TableCell className="column-content">
                <NavLink to={calculateRoute(flight)}>
                  <Button variant="contained">View Flight</Button>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
