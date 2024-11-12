import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { ScheduledFlight } from "../../../types";
import { ScheduledFlightsTable } from "./ScheduledFlightsTable";

describe("ScheduledFlightsTable", () => {
  test("should render flights", async () => {
    const mockData = [
      {
        flightNumber: 1,
        day: 1,
        arrivalCity: "YYZ",
        departureCity: "YYC",
      },
      {
        flightNumber: 2,
        day: 1,
        arrivalCity: "YYZ",
        departureCity: "YVR",
      },
    ] as ScheduledFlight[];

    render(
      <BrowserRouter>
        <ScheduledFlightsTable flights={mockData}></ScheduledFlightsTable>
      </BrowserRouter>
    );

    const rows = screen.getAllByTestId("flight-info-row");

    rows.forEach((row, i) => {
      const expectedData = mockData[i];

      expect(row).toHaveTextContent(
        `${expectedData.flightNumber}${expectedData.departureCity}${expectedData.arrivalCity}View Flight`
      );
    });
  });
});
