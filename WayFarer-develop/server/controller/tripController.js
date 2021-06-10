import env from 'dotenv';
import db from '../model/db';


env.config();

/**
 *
 *
 * @class TripController
 */
class TripController {
  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @memberof TripController
   */
  createTrip(req, res) {
    const { origin, destination, fare } = req.body;
    const trip_date = new Date();
    const userId = req.decoded.user_id;
    const busId = parseInt(req.params.busId);
    db.query(`SELECT id FROM bus WHERE id=${busId}`).then(bus => {

      const selectedBus = bus.rows.find(bus => bus.id === busId);
      if (selectedBus.rowCount < 1) {
        return res.status(422)
          .json({
            status: 'Failed',
            message: `Bus with ID ${busId} doest not exist`
          });
      }
      const sql = 'INSERT INTO trips(busId, userId, origin, destination, fare, trip_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const params = [busId, userId, origin, destination, fare, trip_date];
      db.query(sql, params)
        .then(info => {
          return res.status(201)
            .json({
              Status: 'success',
              Data: info.rows[0]
            });
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
  }

  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @memberof TripController
   */
  allTrips(req, res) {
    const sql = `SELECT * FROM trips`
    db.query(sql).then(info => {
      return res.status(201)
        .json({
          Status: 'success',
          Data: info.rows
        });
    }).catch(err => res.status(500).json({ Status: 'Failed', Message: err.message }))
  }
  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @memberof TripController
   */
  createBus(req, res) {
    const { number_plate, manufacturer, model, year, capacity } = req.body;

    const sql = 'INSERT INTO bus(number_plate, manufacturer, model, year, capacity) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const params = [number_plate, manufacturer, model, year, capacity];
    db.query(sql, params)
      .then((info) => {
        return res.status(201)
          .json({
            Status: 'success',
            data: info.rows[0]
          })
      }).catch(err => res.status(500).json({ Status: 'Failed', Message: err.message }))
  }

  updateTrip(req, res) {
    const {tripId} = req.params;
    const userId = req.decoded.user_id;

    const sql = `UPDATE trips SET status='Cancelled' WHERE id=${tripId} AND userId=${userId}`;

    db.query(sql).then(() => {
      return res.status(201)
        .json({
          message: 'Trip cancelled successfully'
        })
    }).catch(err => res.status(500).json({ Status: 'Failed', Message: err.message }))
  }

  allBookings(req, res){
    const sql = `SELECT * FROM bookings`;
    db.query(sql).then((info) =>{
      console.log(info.rows);
      return res.status(201)
        .json({
          status: 'Success',
          data: info.rows
        })
    }).catch(err => res.status(500).json({ Status: 'Failed', Message: err.message }));
  }
  usersBookings(req, res){
    const userId = req.decoded.user_id;
    const sql = `SELECT * FROM bookings WHERE userId = ${userId}`;
    db.query(sql).then((info) =>{
      return res.status(201)
        .json({
          status: 'Success',
          data: info.rows
        })
    }).catch(err => res.status(500).json({ Status: 'Failed', Message: err.message }));
  }
}

export default new TripController();
