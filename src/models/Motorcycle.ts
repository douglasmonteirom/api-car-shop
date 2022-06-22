import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from '.';

export interface IMotorcycle extends Motorcycle, Document {}

const motoSchema = new Schema<IMotorcycle>({
  color: String,
  model: String,
  year: Number,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotoModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', motoSchema)) {
    super(model);
  }
}

export default MotoModel;
