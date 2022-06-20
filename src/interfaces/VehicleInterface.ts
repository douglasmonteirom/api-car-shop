import { z } from 'zod';

export const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).gte(1900, { message: 'Year must be greater than or equal to 1900' })
    .lte(2022, { message: 'Year must be less than or equal to 2022' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int({ message: 'Buy Value must be a integer' }),
});

export const idZodSchema = z.string()
  .min(24);

// export type Vehicle = z.infer<typeof vehicleZodSchema>;

export interface Vehicle {
  model: string,
  year: number,
  color: string,
  status?: boolean,
  buyValue: number
}
