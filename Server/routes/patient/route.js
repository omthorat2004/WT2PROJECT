const router = require('express').Router()
const pool = require('../../db/pool')
const {Login,Register} = require('../../controller/patient/auth.controller')
const {TakeAppointment} = require('../../controller/patient/appointment.controller')

router.post('/login',Login)
router.post('/register',Register)
router.post('/appointment',TakeAppointment)

router.get('/tests', (req, res) => {
    const query = 'SELECT Test_Id AS id, Test_Name AS name, Description AS description, Cost AS cost, Sample_Type AS sampleType FROM tests';
  
    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching tests:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results);
    });
  });
  

module.exports = router

