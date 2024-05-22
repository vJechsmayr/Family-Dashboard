const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

/**
 * Models
 */
const Device = require('./models/Device');
const DeviceGroup = require('./models/DeviceGroup');

/**
 * Routes
 */
const deviceRoutes = require('./routes/devices');
const deviceGroupRoutes = require('./routes/devicegroup');

app.use(express.json());
app.use('/devices', deviceRoutes);
app.use('/deviceGroup', deviceGroupRoutes);

const PORT = process.env.PORT || 3009;

/* *************************************************************
*  RSS Parser
****************************************************************/
const orfNews = 'https://rss.orf.at/news.xml';
const bbcNews = 'https://feeds.bbci.co.uk/news/rss.xml';



/* *************************************************************
*  Routes
****************************************************************/
app.get('/', async(req, res)=>{
    try{
        res.json("Hello World!");
    }catch(err){
        res.status(500).json({ message: "Failed to fetch data!", error: err.message });
    }
});

/* *************************************************************
*  Error Handling Middleware
****************************************************************/
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



/* *************************************************************
* Export App for testing
****************************************************************/
module.exports = app;


/* *************************************************************
* Create Server
****************************************************************/
app.listen(PORT, ()=>{
    console.log("\n");
    console.log("-----------------------------------------");
    console.log(`Dashboard-App listening on port ${PORT}!`);
    console.log("-----------------------------------------");
    console.log("\n");
});