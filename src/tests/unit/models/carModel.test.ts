import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel, { ICar } from '../../../model/Car'

const functions = {
  create: Sinon.stub().resolves(),
  find: Sinon.stub().resolves(),
  findById: Sinon.stub().resolves(),
  findByIdAndUpdate: Sinon.stub().resolves(),
};

describe('Model', () => {
  const modelStub = () => functions;

  const model = new CarModel( modelStub() as unknown as Model<ICar>,);

  it('exist', () => {
    expect(model).to.be.an('object');
  });

  it('CRUD functios exist', () => {
    expect(model.create).to.be.an('function');
    expect(model.read).to.be.an('function');
    expect(model.readOne).to.be.an('function');
    expect(model.update).to.be.an('function');
    expect(model.delete).to.be.an('function');
  });
  describe('CRUD functios working', () => {
    const id = '62b0adadadc2fa25883f9eaf';
    const car = {
      "model": "Ferrari",
      "year": 1963,
      "color": "red",
      "buyValue": 3500000,
      "seatsQty": 2,
      "doorsQty":	2
    }
    it('create', async () => {
      await model.create(car);
      expect(functions.create.called).to.be.true;
    });
    it('read', async () => {
      await model.read();
      expect(functions.find.called).to.be.true;
    });
    it('readOne', async () => {
      await model.readOne(id);
      expect(functions.findById.called).to.be.true;
    });
    it('update', async () => {
      await model.update(id, car);
      expect(functions.findByIdAndUpdate.called).to.be.true;
    });
  });
});