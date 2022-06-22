import CustomRouter from './routes/Routes';
import App from './app';

import CarController from './controllers/Cars';
import MotoController from './controllers/Motorcycle';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motoController = new MotoController();

const carRouter = new CustomRouter<Car>();
const motoRouter = new CustomRouter<Motorcycle>();
carRouter.addRoute(carController);
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

export default server;
