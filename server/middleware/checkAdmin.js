
const checkAdmin = (req, res, next) => {
    (req.decoded.is_admin) ? next() : res.status(200).send({ Message: 'You are not permitted' });
  }
  
  export default checkAdmin;
  