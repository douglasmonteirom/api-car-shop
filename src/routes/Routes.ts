import { Router } from 'express';
import Controller from '../controllers';
import validId from '../middleware/validId';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, validId, controller.readOne);
    this.router.post(route, controller.create);
    this.router.put(`${route}/:id`, validId, controller.update);
    this.router.delete(`${route}/:id`, validId, controller.delete);
  }
}

export default CustomRouter;