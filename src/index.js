require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');
const handleError = require('../middlewares/handleError');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use(handleError);

app.listen(process.env.SERVER_PORT, () => {console.log('Oke Sip Lanjut')});
