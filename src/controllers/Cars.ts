import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/Cars';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const carID = await this.service.create(body);
      if (!carID) return res.status(400).json({ error: this.errors.internal });
      if ('error' in carID) {
        return res.status(400).json({ error: carID.error.message });
      }
      return res.status(201).json(carID);
    } catch (e) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
