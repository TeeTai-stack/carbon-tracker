import { z } from "zod";

// The ways you can travel — named so other files can reuse the list
export const TravelMode = z.enum(["car", "train", "flight"]);
export type TravelMode = z.infer<typeof TravelMode>;

// Fields every activity has
const common = {
  date: z.iso.date(),             // e.g. "2026-10-28"
  quantity: z.number().positive(), // no zero or negative amounts
};

const Electricity = z.object({ type: z.literal("electricity"), unit: z.literal("kWh"), ...common });
const Gas         = z.object({ type: z.literal("gas"),         unit: z.literal("kWh"), ...common });
const Diesel      = z.object({ type: z.literal("diesel"),      unit: z.literal("litres"), ...common });
const Travel      = z.object({ type: z.literal("travel"),      unit: z.literal("km"), mode: TravelMode, ...common });

// An activity is ONE of these four shapes; `type` says which
export const ActivitySchema = z.discriminatedUnion("type", [Electricity, Gas, Diesel, Travel]);
export type Activity = z.infer<typeof ActivitySchema>;