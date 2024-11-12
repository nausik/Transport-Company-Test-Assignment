import startServer from "./server.js";

/**
 * Not the prettiest way to import JSON, but the easiest for the task
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const flightOrders = require("./data/flight_orders.json");
const scheduledFlights = require("./data/scheduled_flights.json");

startServer(flightOrders, scheduledFlights);
