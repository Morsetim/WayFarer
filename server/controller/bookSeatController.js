import env from 'dotenv';
import db from '../model/db';


env.config();

class Booking{
    seatBooking(req, res){
        const {seat_number} = req.body;
        const createdOn = new Date();
        const sql = 'INSERT INTO booking(seat_number, createdOn) VALUES($1, $2) RETURNING *';
        const params = [seat_number, createdOn];
        db.query(sql, params)
        .then((book) =>{
            return res.status(201)
            .json({
              status: 'success',
              data : {
              booking_id: book.rows[0].id,
              user_id: book.rows[0].userid, //
              trip_id: book.rows[0].tripid, //
              bus_id: book.rows[0].bus_id,
              trip_id: book.rows[0].tripid,
              seat_number: book.rows[0].seat_number,
              first_name: book.rows[0].first_name,
              last_name: book.rows[0].last_name,
              createdOn: book.rows[0].createdOn,
              email: book.rows[0].email
              }
             });   
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
    }
}

export default new Booking();