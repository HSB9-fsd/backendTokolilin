require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Router = require('./routes/router');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/api', Router);
// app.get('/products', (req, res) => {
//     res.json({
//         message: 'contoh /products'
//     })
// })

app.listen(process.env.SERVER_PORT, () => { console.log(`Server running on port ${process.env.SERVER_PORT}`) });
