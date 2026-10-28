import type { TravelMode } from "./activity";

// kg CO2e per unit. APPROXIMATE placeholders — swap in the current DESNZ conversion factors.
export const FACTORS_YEAR = 2025;

export const factors = {
  electricity: 0.177, // per kWh, UK grid
  gas: 0.183,         // per kWh (gross CV)
  diesel: 2.51,       // per litre, average biofuel blend
} as const;

export const travelFactors = {
  car: 0.17,    // per km, average car
  train: 0.035, // per km, national rail
  flight: 0.15, // per km, short-haul economy
} as const satisfies Record<TravelMode, number>;