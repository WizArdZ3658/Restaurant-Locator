const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/restaurants', require('./routes/restaurants'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
;