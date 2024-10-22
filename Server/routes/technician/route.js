const router = require('express').Router()
const {LoginTechnician,RegisterTechnician} = require('../../controller/technician/auth.controller')
const {getAppointments,getAcceptedAppointment,acceptAppointment,uploadResult} = require('../../controller/technician/appointment.controller')

router.post('/login',LoginTechnician)
router.post('/register',RegisterTechnician)



router.get('/appointments',getAppointments)
router.get('/appointments/:id',getAcceptedAppointment)
router.patch('/appointment/:appointment_id',acceptAppointment)
router.post('/appointment/:appointment_id/upload',uploadResult)

module.exports = router

