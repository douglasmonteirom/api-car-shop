import Sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import CarController from '../../../controllers/Cars';
import CarService from '../../../services/Cars';

chai.use(chaiHttp);

const { expect } = chai;

const functions = {
  create: Sinon.stub().resolves(),
  read: Sinon.stub().resolves(),
  readOne: Sinon.stub().resolves(),
  update: Sinon.stub().resolves(),
  delete: Sinon.stub().resolves(),
};

describe('Controller', () => {
  const serviceStub = () => functions;

  const controller = new CarController(serviceStub() as unknown as CarService);
  it('exist', () => {
    expect(controller).to.be.an('object');
  });

});