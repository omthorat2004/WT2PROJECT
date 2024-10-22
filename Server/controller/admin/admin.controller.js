const pool = require("../../db/pool")

const getPatients = (req,res)=>{

    try{
        pool.query('SELECT * FROM patients ',(err,result)=>{
            if (err) throw err
            return res.status(200).json({patients:result})
        })
    }catch(err){
        return res
    }
}
const getTechnicians = (req,res)=>{
    try{
        pool.query('SELECT *  FROM technicians',(err,result)=>{
            if (err) throw err
            return res.status(200).json({technicians:result})
        })
    }catch(err){
        return res
    }
} 


const approveResult = (req, res) => {
    const { result_id } = req.body;
    pool.query(
        'UPDATE results SET approved_by_admin = 1 WHERE result_id = ?',
        [result_id],
        (err, result) => {
            if (err) {
                console.error('Error occurred while approving result:', err);
                return res.status(500).json({ error: 'Error occurred while approving the result' });
            }
            return res.status(200).json({ message: 'Result approved successfully' });
        }
    );
};
const getResults = (req, res) => {
    try {
       
        const query = `
            SELECT r.result_id, r.result_url, r.uploaded_at, r.approved_by_admin,
                   a.Appointment_Date, a.Status, 
                   p.id as patient_id, p.name as patient_name, p.email as patient_email, p.phone as patient_phone,
                   t.technician_id, t.name as technician_name, t.specialization
            FROM results r
            INNER JOIN appointments a ON r.appointment_id = a.Id
            INNER JOIN patients p ON a.Patient_Id = p.id
            INNER JOIN technicians t ON a.Technician_Id = t.technician_id
            WHERE a.Status = 'Completed'
            AND r.approved_by_admin = 0
            ORDER BY r.uploaded_at DESC
        `;

      
        pool.query(query, (err, result) => {
            if (err) {
                console.error('Error occurred while fetching results:', err);
                return res.status(500).json({ error: 'Error occurred' });
            }
            
            return res.status(200).json({ results: result });
        });
    } catch (err) {
        console.error('Error occurred while handling the request:', err);
        return res.status(500).json({ error: 'Error occurred' });
    }
};


module.exports = {getTechnicians,getPatients,getResults,approveResult}