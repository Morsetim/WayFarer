import express from 'express';
import userController from '../controller/userController';
import tripController from '../controller/tripController';
import bookingController from '../controller/bookSeatController';
import userValidator from '../middleware/userValidation';
import tripValidator from '../middleware/tripValidation';

const router = express.Router();

//User Route
router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);
router.route('/auth/signin')
  .get(userController.signIn)

//Trip Route
router.route('/trip')
  .post(tripValidator.createTrip, tripController.createTrip)
  .get(tripController.allTrips)
router.route('/bus')
  .post(tripValidator.createBus, tripController.createBus)
router.route('/bookings')
  .post(bookingController.seatBooking)

export default router;