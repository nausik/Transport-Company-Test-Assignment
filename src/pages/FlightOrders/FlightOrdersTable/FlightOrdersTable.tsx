import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { flightOrdersTableCols } from "./consts";
import { FlightOrdersTableProps } from "./types";

export const FlightOrdersTable = ({
  flightWithOrders,
}: FlightOrdersTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {flightOrdersTableCols.map((column) => (
              <TableCell key={column.id}>
                <span className="column-header">{column.label}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {flightWithOrders.orders.map((order) => (
            <TableRow key={order}>
              <TableCell className="column-content">{order}</TableCell>
              <TableCell className="column-content">
                {flightWithOrders.flight?.flightNumber}
              </TableCell>
              <TableCell className="column-content">
                {flightWithOrders.flight?.departureCity}
              </TableCell>
              <TableCell className="column-content">
                {flightWithOrders.flight?.arrivalCity}
              </TableCell>
              <TableCell className="column-content">
                {flightWithOrders.flight?.day}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
