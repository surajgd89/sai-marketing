const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const products = require('./products.json');
const brands = require('./brands.json');


app.post('/api/send-email', async (req, res) => {
   try {
      const { name, email, mobile, subject, message } = req.body;

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
         },
      });

      const mailOptions = {
         from: 'mail.shreeshadigital@gmail.com',
         to: 'suraj.gd89@gmail.com',
         subject: 'New Contact Query From Website',
         text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent successfully!' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }

});

app.get('/api/data', (req, res) => {
   res.json(products);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
