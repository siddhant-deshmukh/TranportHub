import auth from '../middleware/auth'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { google } from "googleapis"
import express, { NextFunction, Request, Response } from 'express'
import User, { IUserCreate, IUserStored } from '../models/users';
import { body, validationResult } from 'express-validator';
import validate from '../middleware/validate';

// auth is middleware which validates the token and passon the information of user by decrypting token


dotenv.config();
var router = express.Router();

const googleClient = new google.auth.OAuth2(process.env.GoogleClientId, process.env.Google_Secret, `${process.env.Client_Url}`);

// to send information about user
router.get('/', auth, function (req: Request, res: Response, next: NextFunction) {
  return res.status(201).json({ user: res.user });
});

router.post('/', auth, function (req: Request, res: Response, next: NextFunction) {
  res.send({ title: 'This is for todo' });
});

router.post('/register',
  body('email').exists().isEmail().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('name').exists().isString().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('password').exists().isString().isLength({ max: 20, min: 5 }).trim(),
  body('address').exists().isString().isLength({ max: 200, min: 5 }).trim(),
  body('user_type').exists().isIn(['manufacturer', 'transporter']),
  validate,
  async function (req: Request, res: Response, next: NextFunction) {
    try {

      const { email, name, password, user_type, address }: IUserCreate = req.body;

      const checkEmail = await User.findOne({ email });

      if (checkEmail) return res.status(409).json({ msg: 'User already exists!' });

      // this will do the hashing and encrupt the password before storing it in the database
      //@ts-ignore
      const encryptedPassword = await bcrypt.hash(password, 15)
      console.log(password, encryptedPassword)
      const newUser: IUserStored = await User.create({
        email,
        name,
        password: encryptedPassword,
        user_type,
        address
      })

      // in token mongodb object _id will be stored. After 2h token will expire 
      const token = jwt.sign({ _id: newUser._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })

      // Set-Cookie header
      // add an access_token cookie in the frontend will get validated to autherize some url
      res.cookie("access_token", token)

      return res.status(201).json({ token, user: newUser })

    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  }
);

router.post('/login-password',
  body('email').exists().isEmail().isLength({ max: 50, min: 3 }).toLowerCase().trim(),
  body('password').exists().isString().isLength({ max: 20, min: 5 }).trim(),
  validate,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: { email: string, password: string } = req.body;

      const checkUser = await User.findOne({ email });

      if (!checkUser) return res.status(404).json({ msg: 'User doesn`t exists!' });

      // if user use another method to login like google/github insted of password
      if (!checkUser.password) return res.status(405).json({ msg: 'Try another method' });

      if (!(await bcrypt.compare(password, checkUser.password))) return res.status(406).json({ msg: 'Wrong password!' });

      const token = jwt.sign({ _id: checkUser._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })

      // Set-Cookie header
      // add an access_token cookie in the frontend will get validated to autherize some url
      res.cookie("access_token", token)

      return res.status(201).json({ token, user: checkUser })
    } catch (err) {
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  }
);
router.post('/login-google',
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body
      // console.log(code)
      if (!code) {
        throw "code doesn't exist"
      }

      let { tokens } = await googleClient.getToken(code);    // get tokens
      if (!tokens || !tokens.access_token) {
        throw "token not found"
      }

      let oauth2Client = new google.auth.OAuth2();    // create new auth client
      oauth2Client.setCredentials({ access_token: tokens.access_token });    // use the new auth client with the access_token
      let oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
      });

      let { data } = await oauth2.userinfo.get();    // get user info
      if (!data) {
        throw "no user not found"
      }

      const { email, name, verified_email: emailVerfied } = data
      if (!email || !name || !emailVerfied) {
        throw "Incomplete data found"
      }

      const checkUser = await User.findOne({ email })
      let token = ""
      // console.log(checkUser)
      if (checkUser && checkUser.email === email) {    // login 

        token = jwt.sign({ _id: checkUser._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })
        res.cookie("access_token", token)

      } else {                                         // register
        const newUser: IUserCreate = {
          email,
          name,
          emailVerfied,
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          user_type: 'manufacturer'          // default value is manifacuturer change model later
        }
        const newUserCreated: IUserStored = await User.create(newUser)

        token = jwt.sign({ _id: newUserCreated._id.toString(), email }, process.env.TOKEN_KEY || 'zhingalala', { expiresIn: '2h' })
        res.cookie("access_token", token)
      }

      return res.status(201).json({ token });


    } catch (err) {
      // console.log(err)
      return res.status(500).json({ msg: 'Some internal error occured', err })
    }
  }
);

router.get('/logout', async function (req: Request, res: Response, next: NextFunction) {
  try {

    res.cookie("access_token", null) // will set cookie to null

    return res.status(201).json({ msg: 'Sucessfull!' })

  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})

router.get('/transporters',auth, async function (req, res) {
  try {

    const data = await User.aggregate([
      {$match : {user_type : 'transporter'}},
      {$sort : {name : 1}},
      {$project : {
        name : 1
      }}
    ])

    return res.status(201).json({ data })

  } catch (err) {
    return res.status(500).json({ msg: 'Some internal error occured', err })
  }
})
export default router