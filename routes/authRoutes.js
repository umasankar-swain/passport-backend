import express from 'express';
import { listUser, loginController, registerController } from '../controllers/authController.js';
import passport from '../middlewares/passport.js';
import googleAuth from '../middlewares/googleAuth.js'

//router obj
const router = express.Router();

const CLIENT_URL = "https://localhost:3000/"

//routes

//REGISTER || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

// LIST USERS || GET
router.get('/users', googleAuth.authenticate('jwt', { session: false }), listUser);


// GOOGLE AUTH || GET
router.get('/google', googleAuth.authenticate('google', { scope: ['profile', 'email'] }));

// GOOGLE AUTH CALLBACK || GET
router.get('/google/callback', googleAuth.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Redirect or respond with success message
    console.log('call back called ...........................................')
    res.redirect(CLIENT_URL);
});

// LOGOUT || GET
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            // Handle any error that occurred during session destruction
            console.error('Error occurred during session destruction:', err);
        }
        res.redirect(CLIENT_URL); // Redirect to the desired page after logout
    });
});


export default router;