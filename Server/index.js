const express = require('express')
const cors = require('cors')

const app = express()


const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const patientRouter  = require('./routes/patient/route')
const technicianRouter = require('./routes/technician/route')
const adminRouter = require('./routes/admin/route')

app.use('/patient',patientRouter)
app.use('/technician',technicianRouter)
app.use('/admin',adminRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})