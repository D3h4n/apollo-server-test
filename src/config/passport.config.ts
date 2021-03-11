import { PassportStatic } from 'passport';
import LocalStrategy, { VerifyFunction } from 'passport-local';
import bcrypt from 'bcrypt';
import userDao from '../routes/user/dao/user.dao';

export default function intialize(passport: PassportStatic) {
  const auth: VerifyFunction = async function authenticateUser(
    email,
    password,
    done
  ) {
    const user = await userDao.getUserByEmail(email);

    if (!user?.email) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await bcrypt.compare(password, user?.password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Password incorrect' });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: 'email', passwordField: 'password' },
      auth
    )
  );

  passport.serializeUser((user: any, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userDao.getUser(id as string);

      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
