import { Router, Request, Response } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../model/User';
import {
  DatabaseUserInterface,
  UserInterface,
} from '../interface/UserInterface';
import { isAdminProtected } from '../middlewares';

const router = Router();

const LocalStorage = passportLocal.Strategy;

// passport
passport.use(
  new LocalStorage((username: string, password: string, done) => {
    User.findOne(
      { username: username },
      (err: any, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result: boolean) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      },
    );
  }),
);

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: any, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

router.post('/register', async (req, res) => {
  const { password, username } = req?.body;

  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    res.send('Impropr values');
    return;
  }

  User.findOne({ username }, async (err: any, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send({ message: 'User already exits' });
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('success');
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('success');
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('success');
});

router.get('/users', isAdminProtected, async (req, res) => {
  await User.find({}, (err, data: DatabaseUserInterface[]) => {
    if (err) throw err;

    const filteredUsers: UserInterface[] = [];
    data.forEach((item: DatabaseUserInterface) => {
      const userInformation = {
        id: item._id,
        username: item.username,
        isAdmin: item.isAdmin,
      };
      filteredUsers.push(userInformation);
    });

    res.send(filteredUsers);
  });
});

router.post('/deleteuser', isAdminProtected, async (req, res) => {
  const { id } = req?.body;
  await User.findByIdAndDelete(id);
  res.send('success');
});

export default router;
