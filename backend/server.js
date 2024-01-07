const express = require('express');
const http = require('http');
const fs = require('fs');
const winston = require('winston');
const sql = require('mssql');
const rssParser = require('rss-parser');

const config = require('./config');
const homeSRV = require('./route/homeSRV');

const app = express();
const parser = new rssParser();

const _PORT = 3000;


/* *************************************************************
*  DATABASE CONNECTION
****************************************************************/
const db = '';
// const db = sql.connect({
//     server: config.mssql.server,
//     database: config.mssql.database,
//     user: config.mssql.user,
//     password: config.mssql.password
// });

/* *************************************************************
* Logger
****************************************************************/
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/errorlog.log',
            level: 'error',
            maxsize: 5000000,
            maxFiles: 30
        })
    ], 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.json(),
        winston.format.colorize()
    )
});


/* *************************************************************
*  Helpers
****************************************************************/
const sendResponse = function(origin, res, success, message, data){
    res.json({
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

(async () =>{ 
    
    let feed = await parser.parseURL(orfNews);
    console.log(feed.title);

    feed.items.forEach(item =>{
        console.log(item.title + '\n     ' + item.link);
    });

})();

/* *************************************************************
*  Routes
****************************************************************/
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/dashboard.html', { user: req.user });
});

app.get('/dashboard', (req, res) =>{
    res.sendFile(__dirname + '/views/dashboard.html', { user: req.user });
});


homeSRV.setup(app, db, sendResponse);



/* *************************************************************
* Create Server
****************************************************************/

http.createServer(app).listen(_PORT, ()=>{
    console.log("\n");
    console.log("-----------------------------------------");
    console.log('Dashboard-App listening on port ' + _PORT +'!');
    console.log("-----------------------------------------");
    console.log("\n");
});