import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const motoZodSchema = z.object({
  category: z.string({
    required_error: 'category is required',
    invalid_type_error: 'category must be a string',
  }),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).gte(0).lte(2500),
});

export interface Motorcycle extends Vehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number,
}