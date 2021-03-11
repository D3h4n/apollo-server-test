import { Request, Response } from 'express';
import userDao from '../dao/user.dao';

class UserController {
  private static instance: UserController;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }
    return this.instance;
  }

  getUsers = async function getListOfUsers(_req: Request, res: Response) {
    try {
      let users = await userDao.getUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(404).send('No users');
    }
  };

  getUser = async function getSingleUserByID(req: Request, res: Response) {
    try {
      let user = await userDao.getUser(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      res.status(401).send('User not Found');
    }
  };

  postUser = async function postNewUser(req: Request, res: Response) {
    try {
      let user = await userDao.postUser({ ...req.body });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).send('Error creating new user');
    }
  };

  deleteUser = async function deleteUserByID(req: Request, res: Response) {
    try {
      let result = await userDao.deleteUser(req.params.id);

      res.status(200).send(result);
    } catch (error) {
      res.status(404).send('Could not delete');
    }
  };
}

export default UserController.getInstance();
