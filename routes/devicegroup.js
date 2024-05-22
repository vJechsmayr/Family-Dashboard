const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const DeviceGroup = require('../models/DeviceGroup');

/** ********************************************
 * POST Endpoint to register a new DeviceGroup
 ******************************************** */
router.post('/', async(req, res)=>{
    try{
        const newDeviceGroup = new DeviceGroup(req.body);
        await newDeviceGroup.save();
        res.status(201).json(newDeviceGroup);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get all deviceGroups
 ******************************************** */
router.get('/', async(req, res)=>{
    try{
        const devicegroups = await DeviceGroup.find();
        res.json(devicegroups);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get specific deviceGroup by ID
 ******************************************** */
router.get('/:deviceGroupId', async(req, res)=>{
    try{
        const deviceGroup = await DeviceGroup.findById(req.params.deviceGroupId);
        res.json(deviceGroup);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * PATCH Endpoint to get assign specific Device by ID to a specific deviceGroup by ID
 ******************************************** */
router.patch('/:deviceGroupId/addDevice/:deviceId', async(req, res)=>{
    try{
        const deviceGroup = await DeviceGroup.findById(req.params.deviceGroupId);
        if(!deviceGroup){
            return res.status(404).json({ message: 'DeviceGroup not found!'});
        }

        const device = await Device.findOne(req.params.deviceId);
        if(!device){
            return res.status(404).json({ message: 'Device not found!' });
        }

        deviceGroup.devices.push(device._id);
        await deviceGroup.save();
        res.json(deviceGroup);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;