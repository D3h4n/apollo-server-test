import { Request, Response, NextFunction } from 'express';
import userDao from '../../user/dao/user.dao';
import bcrypt from 'bcrypt';

class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthMiddleware();
    }
    return this.instance;
  }

  checkAuth = function checkUserAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/auth/login');
  };

  checkNotAuth = function checkUserNotAuthenticaed(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.isUnauthenticated()) {
      return next();
    }

    res.redirect('/');
  };

  checkEmail = async function checkEmailDoesNotExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (await userDao.getUserByEmail(req.body.email)) {
      req.flash('error', 'Email already used');
      res.redirect('/auth/register');
      return;
    }

    return next();
  };

  handleRegister = async function handleRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      userDao.postUser({
        name,
        email,
        password: hashedPassword,
      });

      return next();
    } catch (error) {
      res.redirect('/auth/register');
    }
  };
}

export default AuthMiddleware.getInstance();
