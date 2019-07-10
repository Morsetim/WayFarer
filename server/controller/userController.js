import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import db from '../model/db';


env.config();

class UserController {
    signUp(req, res) {
      const {email, firstName, lastName, password} = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(`SELECT id FROM users WHERE email = '${email}'`)
        .then((userFound) => {
          if (userFound.rows.length === 1) {
            return res.status(409)
              .json({
                status: 'Failed',
                message: 'User Already Exist'
              });
          }
          const sql = 'INSERT INTO users(email, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *';
          const params = [email, firstName, lastName, hashedPassword];
          db.query(sql, params)
            .then((user) => {
              const payload = {
                userId: user.rows[0].id,
                email, firstName, lastName
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 10 // 10 hours
              });
              req.token = token;
              return res.status(201)
                .json({
                  status: 'success',
                  is_admin: user.rows[0].isadmin,
                  message: 'Successfully created WayFarer account',
                  token: token
                });
            }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
        }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));
    }
}

export default new UserController();