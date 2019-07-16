import express from 'express';
import userController from '../controller/userController';
import tripController from '../controller/tripController';
import bookingController from '../controller/bookSeatController';
import userValidator from '../middleware/userValidation';
import tripValidator from '../middleware/tripValidation';
import authToken from '../middleware/tokenAuthentification';
import checkAdmin from '../middleware/checkAdmin';


const router = express.Router();

//User Route
router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp)
router.route('/auth/signin')
  .get(userValidator.signIn, userController.signIn)

//Trip Route
router.route('/trips/:busId')
  .post(authToken, checkAdmin, tripController.createTrip)
router.route('/trips/:tripId')
  .patch(authToken, tripController.updateTrip)

router.route('/trips')
  .get(authToken, checkAdmin, tripController.allTrips);

// Bus Route
router.route('/bus')
  .post(authToken, checkAdmin, tripValidator.createBus, tripController.createBus)
router.route('/bus/:busId')
  .get(authToken, tripController.createBus)

// Bookings Route
router.route('/bookings/:tripId')
  .post(authToken, bookingController.seatBooking)
router.route('/bookings/:bookingId')
  .delete(authToken, bookingController.deleteBooking);
  router.route('/bookings')
  .get(authToken, checkAdmin, tripController.allBookings)
  router.route('/bookings/user')
  .get(authToken, tripController.usersBookings)

export default router;