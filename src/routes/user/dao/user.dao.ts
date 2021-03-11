import axios from 'axios';
import { User } from '../dto/user.model';

class UserDao {
  private static instance: UserDao;

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserDao();
    }

    return this.instance;
  }

  postUser = function postSingleUser(resource: User) {
    return new Promise<User>((resolve, reject) => {
      axios
        .post('http://localhost:3000/user', { ...resource })
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };

  getUsers = function getMultipleUsers() {
    return new Promise<User>((resolve, reject) => {
      axios
        .get('http://localhost:3000/user')
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };

  getUser = function getSingleUser(id: string) {
    return new Promise<User>((resolve, reject) => {
      axios
        .get(`http://localhost:3000/user/${id}`)
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  };

  getUserByEmail = function getSingleUserByEmail(email: string) {
    return new Promise<User>((resolve, reject) => {
      axios
        .get('http://localhost:3000/user', {
          params: {
            email,
          },
        })
        .then((res) => resolve(res.data?.[0]))
        .catch(reject);
    });
  };

  deleteUser = function deleteSingleUser(id: string) {
    return new Promise<Boolean>((resolve, reject) => {
      axios
        .delete(`http://localhost:3000/user/${id}`)
        .then((res) => resolve(res.status === 200))
        .catch(reject);
    });
  };
}

export default UserDao.getInstance();
