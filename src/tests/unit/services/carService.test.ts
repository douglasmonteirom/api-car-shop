import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel, { ICar } from '../../../models/Car'
import CarService from '../../../services/Cars';

const functions = {
  create: Sinon.stub().resolves(),
  read: Sinon.stub().resolves(),
  readOne: Sinon.stub().resolves(),
  update: Sinon.stub().resolves(),
};

describe('Service', () => {
  const modelStub = () => functions;

  const service = new CarService(modelStub() as unknown as CarModel);

  it('exist', () => {
    expect(service).to.be.an('object');
  });
  describe('Service workin', () => {
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
      await service.create(car);
      expect(functions.create.called).to.be.true;
    });
    it('error create', async () => {
      const result = await service.create({ ...car, model: '' });

      expect(result).to.have.property('error');
    });
    it('read', async () => {
      await service.read();
      expect(functions.read.called).to.be.true;
    });
    it('readOne', async () => {
      await service.readOne(id);
      expect(functions.readOne.called).to.be.true;
    });
    it('update', async () => {
      await service.update(id, car);
      expect(functions.update.called).to.be.true;
    });
    it('error id update', async () => {
      const result = await service.update('', car);

      expect(result).to.have.property('error');
    });
    it('error body update', async () => {
      const result = await service.update(id, {} as ICar);

      expect(result).to.have.property('error');
    });
  });
});