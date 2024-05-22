const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

/** ********************************************
 * POST Endpoint to register a new Device
 ******************************************** */
router.post('/', async(req, res)=>{
    try{
        const newDevice = new Device(req.body);
        await newDevice.save();
        res.status(201).json(newDevice);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get all devices
 ******************************************** */
router.get('/', async(req, res)=>{
    try{
        const devices = await Device.find();
        res.json(devices);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get specific device by ID
 ******************************************** */
router.get('/:deviceId', async(req, res)=>{
    try{
        const device = await Device.findById(req.params.deviceId);
        res.json(device);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;