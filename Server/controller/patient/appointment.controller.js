const pool = require('../../db/pool')




const TakeAppointment = (req,res)=>{
    try{
        const {patientId,appointmentDate,testId} = req.body
        pool.query('INSERT INTO appointments (Patient_Id,Test_Id,Appointment_Date) VALUES (?,?,?)',[parseInt(patientId),parseInt(testId),appointmentDate],(err,result)=>{
            if (err) throw err
            return res.status(200).json({success:'Completed'})
        })
    }catch(err){
        return res.status(500).json({message:'Server Error Occurred'})

    }
}

module.exports = {TakeAppointment}