import { IResolvers } from 'apollo-server-express';
import UserDao from '../user/dao/user.dao';

const resolverMap: IResolvers<any, any> = {
  Query: {
    getUsers: (_parent, _args, { req }) => {
      if (req.isAuthenticated()) {
        try {
          return UserDao.getUsers();
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      return new Error('Not Authenticated');
    },
    getUser: (_, { id }, { req }) => {
      if (req.isAuthenticated()) {
        try {
          return UserDao.getUser(id);
        } catch (error) {
          console.error(error);
          return {};
        }
      }

      return new Error('Not Authenticated');
    },
  },
  Mutation: {
    deleteUser: (_, { id }, { req }) => {
      if (req.isAuthenticated()) {
        try {
          if (id == req.user.id) {
            throw new Error(`Can't delete yourself loser`);
          }
          return UserDao.deleteUser(id);
        } catch (error) {
          return error;
        }
      }

      return new Error('Not Authenticated');
    },
  },
};

export default resolverMap;
