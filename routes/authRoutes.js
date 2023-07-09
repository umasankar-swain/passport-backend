import express from 'express';
import { listUser, loginController, registerController } from '../controllers/authController.js';
import passport from '../middlewares/passport.js';

//router obj
const router = express.Router();

//routes

//REGISTER || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

// LIST USERS || GET
router.get('/users', passport.authenticate('jwt', { session: false }), listUser);

export default router;