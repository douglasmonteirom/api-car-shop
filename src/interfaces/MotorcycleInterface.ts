import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const motoZodSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).gte(1).lte(2500),
});

export interface Motorcycle extends Vehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number,
}