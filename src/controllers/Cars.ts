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
      const car = await this.service.create(body);
      if (!car) return res.status(400).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (e) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const car = await this.service.readOne(id);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const { body } = req;
      const car = await this.service.update(id, body);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
