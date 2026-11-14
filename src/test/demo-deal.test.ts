import { describe, expect, it } from "vitest";
import { demoRecord, demoVehiclePrep, settlementBalance } from "@/lib/demo-deal";

describe("fictional deal settlement", () => {
  it("keeps Vehicle Prep focused on certification, cleaning, protection and accessories", () => {
    expect(demoVehiclePrep.map(task => task.item)).toEqual(["RWC", "Reclean", "Detail", "Tint", "Seal & Protect", "Towbar"]);
  });
  it("subtracts trade allowance and deposit, and adds the outstanding payout", () => {
    expect(settlementBalance(102900, 18500, 4200, 2500)).toBe(86100);
  });
  it("generates a distinct fictional record for the clicked deal", () => {
    const record = demoRecord({ id: "DEMO-002", name: "Jamie Parker", car: "Example SUV (compact)", value: "$76,400", badge: "T-3", extra: "" });
    expect(record.customerNumber).toBe("SAMPLE-C002");
    expect(record.email).toBe("customer2@example.com");
    expect(record.price).toBe(76400);
  });
});