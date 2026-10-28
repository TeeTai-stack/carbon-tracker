import type { Activity } from "./activity";
import { factors, travelFactors } from "./factors";

export type Scope = 1 | 2 | 3;

export interface Emission {
  kgCO2e: number;
  scope: Scope;
}

export function calculateCO2e(activity: Activity): Emission {
  switch (activity.type) {
    case "electricity":
      return { kgCO2e: activity.quantity * factors.electricity, scope: 2 };
    case "gas":
      return { kgCO2e: activity.quantity * factors.gas, scope: 1 };
    case "diesel":
      return { kgCO2e: activity.quantity * factors.diesel, scope: 1 };
    case "travel":
      return { kgCO2e: activity.quantity * travelFactors[activity.mode], scope: 3 };
    default: {
      // Safety net: if a new activity type is added and not handled above,
      // this line goes red, because `activity` would no longer be "never"
      const unhandled: never = activity;
      throw new Error(`Unhandled activity: ${JSON.stringify(unhandled)}`);
    }
  }
}