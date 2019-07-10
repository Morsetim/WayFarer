import express from 'express';
import userController from '../controller/userController';
import userValidator from '../middleware/userValidation';

const router = express.Router();

//User Route
router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);
router.route('/auth/signin')
  .get(userController.signIn);


export default router;