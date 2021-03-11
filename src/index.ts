import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import initPassport from './config/passport.config';
import dotenv from 'dotenv';

import AuthRoute from './routes/auth/auth.config';
import CommonRoute from './routes/common/common.routes.config';
import GraphQLRoute from './routes/graphql/graphql.config';
import UserRoute from './routes/user/user.config';

// setup
dotenv.config();

const port = process.env.PORT || 5050;
const app = express();
const routes: CommonRoute[] = [];

initPassport(passport);
app.set('view engine', 'ejs');

// middleware/static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
app.get('/', (_, res) => {
  res.status(200).render('index', { title: 'Home', pageName: 'Home Page' });
});

routes.push(new AuthRoute(app, '/auth'));
routes.push(new GraphQLRoute(app, '/api/graphql', false));
routes.push(new UserRoute(app, '/api/user'));

app.use((_req, res) => {
  res.status(404).send('That page was not found');
});

app.listen(port, () => {
  console.log(`Loaded ${routes.length} routes`);
  routes.forEach((route) => console.log(`\t${route.name}`));
  console.log(`Listening on port ${port}`);
});
