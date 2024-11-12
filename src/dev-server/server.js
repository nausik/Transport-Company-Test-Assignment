import express from "express";
import cors from "cors";
import camelize from "camelize";

import { prepareData } from "./utils.js";

const startServer = (flightOrders, scheduledFlights) => {
  const app = express();
  const data = prepareData(flightOrders, scheduledFlights);
  const config = {
    port: 4205,
  };

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

  app.get("/scheduled-flights", (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(camelize(data.flights)));
  });

  app.get("/orders", (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(camelize(data.orders)));
  });

  app.get("/orders/:departure/:arrival/:day", (req, res) => {
    try {
      const { arrival, day } = req.params;

      /**
       * Convert day to number and substract 1 to start indexing from 0
       */
      const normalizedDay = Number(day) - 1;
      const ordersByArrival = data.orders[arrival];
      const ordersByDay = ordersByArrival[normalizedDay] || [];
      const response = { [arrival]: [ordersByDay] };

      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(camelize(response)));
    } catch (e) {
      res.status(500).send("Error");
    }
  });

  app.listen(config.port, () => {
    console.log("Started dev server");
  });

  return app;
};

export default startServer;
