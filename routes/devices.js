const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

/** ********************************************
 * POST Endpoint to register a new Device
 ******************************************** */
router.post('/', async(req, res)=>{
    try{
        res.json("Hallo World!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});
