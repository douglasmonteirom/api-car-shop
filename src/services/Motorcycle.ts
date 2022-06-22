import Service, { ServiceError } from '.';
import { Motorcycle, motoZodSchema } from '../interfaces/MotorcycleInterface';
import { vehicleZodSchema } from '../interfaces/VehicleInterface';
import MotoModel from '../models/Motorcycle';

class MotoService extends Service<Motorcycle> {
  constructor(model = new MotoModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): Promise<
  Motorcycle | 
  ServiceError | 
  null
  > => {
    const parsedMoto = motoZodSchema.safeParse(obj);
    const parsedVehicle = vehicleZodSchema.safeParse(obj);
    if (!parsedMoto.success) return { error: parsedMoto.error };
    if (!parsedVehicle.success) return { error: parsedVehicle.error };
    const moto = await this.model.create(obj);
    return moto;
  };

  // readOne = async (id: string): Promise<Car | ServiceError | null> => {
  //   const car = await this.model.readOne(id);
  //   return car;
  // };

  // update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
  //   if (Object.keys(obj).length === 0) return { error: 'No body' };
  //   const car = await this.model.update(id, obj);
  //   return car;
  // };
}

export default MotoService;
