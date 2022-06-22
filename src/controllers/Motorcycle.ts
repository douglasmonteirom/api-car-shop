import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotoService from '../services/Motorcycle';

class MotoController extends Controller<Motorcycle> {
  private _route: string;

  constructor(service = new MotoService(), route = '/motorcycles') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const moto = await this.service.create(body);
      if (!moto) return res.status(400).json({ error: this.errors.notFound });
      if ('error' in moto) {
        return res.status(400).json(moto);
      }
      return res.status(201).json(moto);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const car = await this.service.readOne(id);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
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

  delete = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      if (!response) {
        return res.status(404).json({ error: this.errors.notFound });
      } 
      return res.status(204).send();
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotoController;
