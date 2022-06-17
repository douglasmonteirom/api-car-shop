import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const carZodSchema = z.object({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).gte(2).lte(4),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).gte(2).lte(7),
});

// export type Car = z.infer<typeof carZodSchema>

export interface Car extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}