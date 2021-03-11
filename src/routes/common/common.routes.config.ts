import { Express, Router } from 'express';

export default abstract class CommonRoute {
  app: Express;
  name: string;
  protected router: Router;

  constructor(app: Express, name: string, useRouter: Boolean = true) {
    this.app = app;
    this.name = name;

    if (!useRouter) {
      this.configureRoutes();
      return;
    }

    this.router = Router();
    this.configureRoutes();
    this.app.use(this.name, this.router);
  }

  abstract configureRoutes(): void;
}
