import CommonRoute from '../common/common.routes.config';
import userController from './controller/user.controller';
import userMiddleWare from './middleware/user.middleware';

export default class UserRoute extends CommonRoute {
  configureRoutes() {
    const { getUsers, getUser, postUser, deleteUser } = userController;
    const { checkAuth } = userMiddleWare;

    this.router
      .use(checkAuth)
      .get('/', [getUsers])
      .get('/:id', [getUser])
      .post('/', [postUser])
      .delete('/:id', [deleteUser]);
  }
}
