const router = require('express').Router()
const pool = require('../../db/pool')
const {getPatients,getTechnicians,getResults,approveResult} = require('../../controller/admin/admin.controller')


router.get('/patients',getPatients)
router.get('/technicians',getTechnicians)
router.get('/results',getResults)
router.post('/approve-result',approveResult)

router.get('/patient/appointments', (req, res) => {
  const { filterType, patientId } = req.query; // Get patientId from the query parameters
  
  let query = `
    SELECT a.Id as appointment_id, a.Appointment_Date, a.Status, a.uploaded,
           p.id as patient_id, p.name as patient_name, p.email as patient_email, p.phone as patient_phone,
           t.technician_id, t.name as technician_name, t.phone as technician_phone,
           r.result_id, r.result_url, r.uploaded_at, r.approved_by_admin
    FROM appointments a
    INNER JOIN patients p ON a.Patient_Id = p.id
    LEFT JOIN technicians t ON a.Technician_Id = t.technician_id
    LEFT JOIN results r ON a.Id = r.appointment_id
    WHERE p.id = ?  -- Filter by patientId
  `;

  // Add additional filters based on the filterType
  if (filterType === 'Pending') {
    query += "AND a.Status = 'Pending' AND (a.Technician_Id IS NULL OR t.technician_id IS NOT NULL)";
  } else if (filterType === 'Accepted') {
    query += "AND a.Status = 'Accepted'";
  } else if (filterType === 'CompletedNotApproved') {
    query += "AND a.Status = 'Completed' AND r.approved_by_admin = 0";
  } else if (filterType === 'CompletedApproved') {
    query += "AND a.Status = 'Completed' AND r.approved_by_admin = 1";
  }

  query += ' ORDER BY a.Appointment_Date DESC';

  // Execute the query with the patientId as a parameter
  pool.query(query, [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ message: 'Error fetching appointments' });
      return;
    }
    res.json({ appointments: results });
  });
});



  router.post('/tests', (req, res) => {
    const { testName, testDescription, testPrice, sampleType } = req.body;
  
    
    const query = `INSERT INTO tests (Test_Name, Description, Cost, Sample_Type) VALUES (?, ?, ?, ?)`;
  
    pool.execute(query, [testName, testDescription, testPrice, sampleType], (err, results) => {
      if (err) {
        console.error('Error inserting test:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'Test added successfully', testId: results.insertId });
    });
  });
  

module.exports = router

