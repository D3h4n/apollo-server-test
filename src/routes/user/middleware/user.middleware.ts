import { Request, Response, NextFunction } from 'express';

class UserMiddleWare {
  private static instance: UserMiddleWare;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserMiddleWare();
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
}

export default UserMiddleWare.getInstance();
