import Service, { ServiceError } from '.';
import { Car, carZodSchema } from '../interfaces/CarInterface';
import { vehicleZodSchema } from '../interfaces/VehicleInterface';
import CarModel from '../models/Car';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsedCar = carZodSchema.safeParse(obj);
    const parsedVehicle = vehicleZodSchema.safeParse(obj);
    if (!parsedCar.success) return { error: parsedCar.error };
    if (!parsedVehicle.success) return { error: parsedVehicle.error };
    const car = await this.model.create(obj);
    return car;
  };

  readOne = async (id: string): Promise<Car | ServiceError | null> => {
    const car = await this.model.readOne(id);
    return car;
  };

  update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
    if (Object.keys(obj).length === 0) return { error: 'No body' };
    const car = await this.model.update(id, obj);
    return car;
  };
}

export default CarService;
