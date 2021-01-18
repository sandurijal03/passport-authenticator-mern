import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';

import cookieParser from 'cookie-parser';
import session from 'express-session';

import registerRoutes from './routes/routes';

mongoose.connect(
  `${process.env.DB_URI}/${process.env.DB_NAME}`,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err: Error) => {
    if (err) throw err;
    console.log('connected to mongo');
  },
);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: `${process.env.SECRET_KEY}`,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', registerRoutes);

app.listen(process.env.PORT, () =>
  console.log('server is listening  on http://localhost:3001'),
);
