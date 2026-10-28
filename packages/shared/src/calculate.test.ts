import { describe, it, expect } from "vitest";
import { calculateCO2e } from "./calculate";
import { ActivitySchema } from "./activity";

describe("calculateCO2e", () => {
  it("calculates electricity as scope 2", () => {
    const result = calculateCO2e({ type: "electricity", unit: "kWh", date: "2026-10-01", quantity: 1000 });
    expect(result.kgCO2e).toBeCloseTo(177);
    expect(result.scope).toBe(2);
  });

  it("calculates diesel as scope 1", () => {
    const result = calculateCO2e({ type: "diesel", unit: "litres", date: "2026-10-01", quantity: 50 });
    expect(result.kgCO2e).toBeCloseTo(125.5);
    expect(result.scope).toBe(1);
  });

  it("uses the right factor for each travel mode", () => {
    const train = calculateCO2e({ type: "travel", unit: "km", mode: "train", date: "2026-10-01", quantity: 200 });
    const car = calculateCO2e({ type: "travel", unit: "km", mode: "car", date: "2026-10-01", quantity: 100 });
    expect(train.kgCO2e).toBeCloseTo(7);
    expect(car.kgCO2e).toBeCloseTo(17);
    expect(train.scope).toBe(3);
  });
});

describe("ActivitySchema", () => {
  it("rejects diesel measured in kWh", () => {
    const result = ActivitySchema.safeParse({ type: "diesel", unit: "kWh", date: "2026-10-01", quantity: 50 });
    expect(result.success).toBe(false);
  });

  it("rejects a negative quantity", () => {
    const result = ActivitySchema.safeParse({ type: "gas", unit: "kWh", date: "2026-10-01", quantity: -5 });
    expect(result.success).toBe(false);
  });
});