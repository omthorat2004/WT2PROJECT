const pool = require('../../db/pool');
const bcrypt = require('bcrypt');

const RegisterTechnician = (req, res) => {
    const { name, email, phone, qualification, specialization, hireDate, password } = req.body;

    try {
        // Validate required fields
        if (!name || !email || !phone || !password || !hireDate) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }

        // Check if technician already exists
        const existingTechnicianQuery = 'SELECT * FROM technicians WHERE email = ? OR phone = ?';
        pool.query(existingTechnicianQuery, [email, phone], async (err, existingTechnician) => {
            if (err) {
                console.error('Error checking existing technician:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (existingTechnician.length > 0) {
                return res.status(409).json({ message: 'Technician with this email or phone number already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertTechnicianQuery = `
                INSERT INTO technicians (name, email, phone, qualification, specialization, hire_date, password)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            const values = [name, email, phone, qualification, specialization, hireDate, hashedPassword];

            pool.query(insertTechnicianQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting technician:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Respond with the success message
                return res.status(201).json({ message: 'Technician registered successfully', technicianId: result.insertId });
            });
        });
    } catch (err) {
        console.error('Error in RegisterTechnician function:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const LoginTechnician = (req, res) => {
    try {
        const { email, password } = req.body;

        pool.query('SELECT * FROM technicians WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;

            if (!result[0]) {
                return res.status(404).json({ error: 'Technician not found' });
            }

            const authorised = await bcrypt.compare(password, result[0].password);

            if (authorised) {
                const { password, ...userData } = result[0];
                return res.status(200).json({ userData: userData });
            } else {
                return res.status(403).json({ error: 'Incorrect Password or Email' });
            }
        });
    } catch (err) {
        console.error('Error in LoginTechnician function:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { RegisterTechnician, LoginTechnician };
