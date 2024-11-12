import { dailyLimit } from "./consts.js";

export const groupBy = (arr, key) => {
  return arr.reduce((acc, el) => {
    (acc[el[key]] = acc[el[key]] || []).push(el);
    return acc;
  }, {});
};

export const splitByChunks = (inputArray = [], perChunk = dailyLimit) =>
  inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

/**
 * Group orders by Arrival airport and split by daily limit
 * if the amount of chunks > then N of flights to destination - there will be unassigned orders
 *
 * REALLY unoptimal and there's quite a lot of stuff
 */
export const transformOrders = (orders, flights, limitPerFlight) => {
  const keys = Object.keys(orders);

  /**
   * Group orders by their destination
   */
  const ordersGroupedByDestination = keys.reduce((acc, key) => {
    const destination = orders[key].destination;

    if (destination in acc) {
      return { ...acc, [destination]: [...acc[destination], key] };
    } else {
      return { ...acc, [destination]: [key] };
    }
  }, {});

  const destinations = Object.keys(ordersGroupedByDestination);
  const flightsGroupedByDestination = groupBy(flights, "arrival_city");

  return destinations.reduce((acc, destination) => {
    const destinationFlights = flightsGroupedByDestination[destination] || [];

    /**
     * Split orders by chunks of limited amount
     */
    const chunks = splitByChunks(
      ordersGroupedByDestination[destination],
      limitPerFlight
    );

    /**
     * Assign flight to each chunk if possible
     */
    const assignedFlights = chunks.reduce((acc, chunk, i) => {
      return [...acc, { flight: destinationFlights[i] || null, orders: chunk }];
    }, []);

    return {
      ...acc,
      [destination]: assignedFlights,
    };
  }, {});
};

/**
 * Prepare data for API. Assign orders to each flights, group flights by day etc
 */
export const prepareData = (flightOrders, scheduledFlights) => {
  const groupedFlights = groupBy(scheduledFlights, "day");

  const transformedGroupedFlights = Object.entries(groupedFlights).map(
    ([day, flights]) => ({
      day,
      flights,
    })
  );

  const transformedGroupedOrders = transformOrders(
    flightOrders,
    scheduledFlights,
    dailyLimit
  );

  return {
    flights: transformedGroupedFlights,
    orders: transformedGroupedOrders,
  };
};
