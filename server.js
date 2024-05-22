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

/**
 * Routes
 */
const deviceRoutes = require('./routes/devices');

app.use(express.json());
app.use('/devices', deviceRoutes);

const PORT = process.env.PORT || 3009;


/* *************************************************************
*  Helpers
****************************************************************/
const sendResponse = function(origin, res, success, code, message, data){
    res.status(code).json({
        success: success, message: message, data: data
    });

    if(success){
        logger.info(origin + ' - ' + message);
    }else{
        logger.error(origin + ' - ' + message);
    }
};

/* *************************************************************
*  RSS Parser
****************************************************************/
const orfNews = 'https://rss.orf.at/news.xml';
const bbcNews = 'https://feeds.bbci.co.uk/news/rss.xml';



/* *************************************************************
*  Routes
****************************************************************/
app.get('', async(req, res)=>{
    try{

    }catch(err){
        //res.status(500).json({ message: "Failed to fetch data!", error: err.message });
        sendResponse('/origin', res, false, 500, "Failed to fetch data!" + err.message);
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