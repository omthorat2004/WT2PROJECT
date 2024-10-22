const pool = require('../../db/pool');
const bcrypt = require('bcrypt');

const Register = (req, res) => {
    const { name, email, phone, address, gender, bloodGroup, medicalHistory, password, photoURL } = req.body;

    try {
  
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }
 
       
        const existingPatientQuery = 'SELECT * FROM patients WHERE email = ? OR phone = ?';
        pool.query(existingPatientQuery, [email, phone], async (err, existingPatient) => {
            if (err) {
                console.error('Error checking existing patient:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            
            if (existingPatient.length > 0) {
                return res.status(409).json({ message: 'Patient with this email or phone number already exists.' });
            }
        
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertPatientQuery = `
                INSERT INTO patients (name, email, phone, address, gender, bloodGroup, medicalHistory, password, imageUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const values = [name, email, phone, address, gender, bloodGroup, medicalHistory, hashedPassword, photoURL];

            pool.query(insertPatientQuery, values, (err, result) => {
                if (err) {
                    console.error('Error inserting patient:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Respond with the success message
                return res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
            });
        });
    } catch (err) {
        console.error('Error in register function:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Login = (req, res) => {
    try {
        const { email, password } = req.body;

        pool.query('SELECT * FROM patients WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;

            if (!result[0]) {
                return res.status(404).json({ error: 'Patient not found' });
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
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { Register, Login };
