
// routes/user.js
import express from 'express';
import auth from '../common/auth.js';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/login', userController.login);
router.post('/registeruser', userController.registerUser);
router.get('/getdata', userController.getUserData);
router.get('/getuser/:id', userController.getIndividualUser);
router.put('/updateuser/:id', userController.updateUserData);
router.delete('/deleteuser/:id', userController.deleteUser);

export default router;