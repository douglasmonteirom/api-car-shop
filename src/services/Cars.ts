import Service, { ServiceError } from '.';
import { Car, carZodSchema } from '../interfaces/CarInterface';
import { idZodSchema, vehicleZodSchema } from '../interfaces/VehicleInterface';
import CarModel from '../model/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsedCar = carZodSchema.safeParse(obj);
    const parsedVehicle = vehicleZodSchema.safeParse(obj);
    const car = await this.model.create(obj);
    if (!parsedCar.success) return { error: parsedCar.error };
    if (!parsedVehicle.success) return { error: parsedVehicle.error };
    return car;
  };

  readOne = async (id: string): Promise<Car | ServiceError | null> => {
    const validId = idZodSchema.safeParse(id);
    if (!validId.success) {
      return ({ error: 'Id must have 24 hexadecimal characters' });
    }
    const car = await this.model.readOne(id);
    return car;
  };
}

export default CarService;
