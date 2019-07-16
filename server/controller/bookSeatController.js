import env from 'dotenv';
import db from '../model/db';


env.config();

class Booking {
  seatBooking(req, res) {
    const { seat_number } = req.body;
    const createdOn = new Date();
    const { userId, email, firstName, lastName } = req.decoded;
    const tripId = parseInt(req.params.tripId);

    db.query(`SELECT id FROM trips WHERE id =${tripId}`).then(trip => {
      if (trip.rowCount < 1) {
        return res.status(422)
          .json({
            status: 'Failed',
            message: `Trip with ID ${tripId} does not exist`
          });
      }

      const sql = 'INSERT INTO bookings(seat_number, createdOn,userId, tripId) VALUES($1, $2, $3,$4) RETURNING *';
      const params = [seat_number, createdOn, userId, tripId];
      db.query(sql, params)
        .then((book) => {
          return res.status(201)
            .json({
              status: 'success',
              data: { ...book.rows[0], firstName, email, lastName }
            });
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
  }

  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @memberof Booking
   */
  deleteBooking(req, res) {
    const { userId } = req.decoded;
    const { bookingId } = req.params;
    const sql = `DELETE FROM bookings WHERE id= ${bookingId} AND userId = ${userId}`;
    db.query(sql).then(() => {
      return res.status(201)
        .json({
          message: 'Booking deleted successfully'
        })
    }).catch(e => console.log(e))
  }

}


export default new Booking();