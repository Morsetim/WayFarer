import express from 'express';
import userController from '../controller/userController';
import userValidator from '../middleware/userValidation';

const router = express.Router();

router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);


export default router;