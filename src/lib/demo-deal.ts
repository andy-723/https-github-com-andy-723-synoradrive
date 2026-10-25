export interface DemoDeal {
  id: string;
  name: string;
  car: string;
  value: string;
  badge: string;
  extra: string;
}

export function settlementBalance(price: number, allowance: number, payout: number, deposit: number) {
  return price - allowance + payout - deposit;
}

export function demoRecord(deal: DemoDeal) {
  const sequence = Number(deal.id.replace("DEMO-", ""));
  const price = Number(deal.value.replace(/[^0-9.]/g, ""));
  return {
    customerNumber: `SAMPLE-C${String(sequence).padStart(3, "0")}`,
    stockNumber: `SAMPLE-S${String(sequence).padStart(3, "0")}`,
    email: `customer${sequence}@example.com`,
    mobile: "Not supplied · demo record",
    address: "Example suburb, VIC · fictional address",
    vin: `SAMPLE-VIN-${String(sequence).padStart(3, "0")}`,
    registration: `DEMO${sequence}`,
    colour: sequence % 2 ? "Alpine White" : "Mineral Grey",
    owner: "Morgan Sample · Sales",
    price,
    allowance: 18500,
    payout: 4200,
    deposit: 2500,
    trade: { car: "2018 Example hatchback", colour: "Pure White", kms: "68,400 km", registration: `TRADE${sequence}`, vin: `SAMPLE-TRADE-VIN-${sequence}` },
  };
}