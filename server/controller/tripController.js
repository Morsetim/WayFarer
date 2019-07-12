import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../model/db';


env.config();

class TripController{
    createTrip(req,res){
        const {origin, destination, fare} = req.body;

        const sql = 'INSERT INTO trip(origin, destination, fare) VALUES($1, $2, $3) RETURNING *';
        const params = [origin, destination, fare];
        db.query(sql, params)
        .then((info) =>{
            return res.status(201)
                .json({
                    status: 'success',
                    data : {
                        trip_id : info.rows[0].id,
                        bus_id : info.rows[0].busid,
                        origin : info.rows[0].origin,
                        destination : info.rows[0].destination,
                        trip_date : info.rows[0].trip_date,
                        fare : info.rows[0].fare
                    }

                })
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
    }
    allTrips(req, res) {
        const sql = `SELECT * FROM trip`
        db.query(sql).then(info => {
          return res.status(201)
            .json({
              status: 'success',
              data : info.rows

            });
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
    }

    createBus(req, res){
        const {number_plate, manufacturer, model, year, capacity} = req.body;

        const sql = 'INSERT INTO bus(number_plate, manufacturer, model, year, capacity) VALUES($1,$2,$3,$4,$5) RETURNING *';
        const params = [number_plate, manufacturer, model, year, capacity];
        db.query(sql, params)
        .then((info) =>{
            return res.status(201)
                .json({
                    status : 'success',
                    data : {
                        bus_id : info.rows[0].id,
                        number_plate : info.rows[0].number_plate,
                        manufacturer : info.rows[0].manufacturer,
                        model : info.rows[0].model,
                        year : info.rows[0].year,
                        capacity : info.rows[0].capacity
                    }
                })
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
}
}
export default new TripController();