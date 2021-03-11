import { authenticate } from 'passport';
import CommonRoute from '../common/common.routes.config';
import authController from './controller/auth.controller';
import authMiddleware from './middleware/auth.middleware';

export default class AuthRoute extends CommonRoute {
  configureRoutes() {
    const {
      checkAuth,
      checkNotAuth,
      checkEmail,
      handleRegister,
    } = authMiddleware;
    const { logout, login, register } = authController;

    this.router.get('/logout', [checkAuth, logout]);

    this.router
      .route('/login')
      .get([checkNotAuth, login])
      .post(
        authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/auth/login',
          failureFlash: true,
        })
      );

    this.router
      .route('/register')
      .get([checkNotAuth, register])
      .post([
        checkEmail,
        handleRegister,
        authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/auth/login',
          failureFlash: true,
        }),
      ]);
  }
}
