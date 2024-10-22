const pool = require('../../db/pool');

const getAppointments = (req, res) => {
    try {
        pool.query(
            'SELECT p.name, p.address, p.email, p.medicalHistory,p.phone, a.appointment_date,a.Id FROM patients p INNER JOIN appointments a ON a.patient_id = p.id WHERE Status="Pending" ',
            (err, result) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({ appointments: result });
            }
        );
    } catch (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const uploadResult = (req,res)=>{
    try{
        const {appointment_id} = req.params
        const {result_url}  = req.body
        const uploadedAt = new Date();
        pool.query('INSERT INTO results (appointment_id,result_url,uploaded_at) VALUES (?,?,?)',[appointment_id,result_url,uploadedAt],(err,result)=>{
            if (err) throw err
            pool.query('UPDATE appointments SET Status=? WHERE Id=?',['Completed',parseInt(appointment_id)],(err,uploadResult)=>{
                if (err) throw err
                return res.status(200).json({message:'Result Uploaded! Waiting for Admin Approval'})
            })
        })

    }catch(err){
        return res.status(500).json({message:'Server Error'})
    }

}

const acceptAppointment = (req,res)=>{
    try{
        const {appointment_id}=req.params;
        const {technician_id}=req.body;
        pool.query("UPDATE appointments SET Technician_id=?,Status='Accepted' WHERE Id=?",[parseInt(technician_id),parseInt(appointment_id)],(err,result)=>{
            if (err) throw err
            return res.status(200).json({message:'Appointment Accepted'})
        })
    }catch(err){
        return res.status(500).json({message:'Server Error'})
    }
}

const getAcceptedAppointment = (req, res) => {
    try {
        
        const {id} = req.params;
        if (!id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const technicianId = parseInt(id)
        console.log(technicianId)
        if (isNaN(technicianId)) {
            return res.status(400).json({ message: 'Invalid Technician ID' });
        }


        pool.query(
            'SELECT p.name, p.address, p.email, p.medicalHistory,p.phone, a.appointment_date,a.Id FROM patients p INNER JOIN appointments a ON a.patient_id = p.id WHERE a.technician_id = ? AND a.status=?',
            [technicianId,'Accepted'],
            (err, result) => {
                if (err) {
                    throw err;
                }
                return res.status(200).json({ appointments: result });
            }
        );
    } catch (err) {
        console.error('Error fetching accepted appointments:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAppointments,
    getAcceptedAppointment,
    acceptAppointment,
    uploadResult
};
