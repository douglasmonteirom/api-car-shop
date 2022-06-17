import Service, { ServiceError } from '.';
import { Car, carZodSchema } from '../interfaces/CarInterface';
import { vehicleZodSchema } from '../interfaces/VehicleInterface';
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
}

export default CarService;
