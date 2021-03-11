import { Request, Response } from 'express';

class AuthController {
  private static instance: AuthController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthController();
    }
    return this.instance;
  }

  login = function renderLoginPage(_req: Request, res: Response) {
    res.render('login', { title: 'Login', pageName: 'Login Page' });
  };

  logout = function handleLogoutUser(req: Request, res: Response) {
    req.logOut();
    res.redirect('/auth/login');
  };

  register = function renderRegisterPage(_req: Request, res: Response) {
    res.render('register', { title: 'Register', pageName: 'Register' });
  };
}

export default AuthController.getInstance();
