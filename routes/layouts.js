const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const DeviceGroup = require('../models/DeviceGroup');
const Zone = require('../models/Zone');
const Layout = require('../models/Layout');

/** ********************************************
 * POST Endpoint to create a new Layout
 ******************************************** */
router.post('/', async(req, res)=>{
    try{    
        const newLayout = new Layout(req.body);
        await newLayout.save();
        res.status(201).json(newLayout);
    }catch(err){
        res.status(400).json({ err: err.message });
    }
});

/** ********************************************
 * POST Endpoint to create and add a new Zone to a Layout
 ******************************************** */
router.post('/:layoutId/zones', async(req, res)=>{
    const { layoutId }  = req.params;
    const zoneData = req.body;
    try{
        const newZone = new Zone(zoneData);
        await newZone.save();

        const layout = await Layout.findById(layoutId);
        layout.zones.push(newZone._id);
        await layout.save();

        res.status(201).json(newZone);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

/** ********************************************
 * PATCH Endpoint to assign a Layout to a Device
 ******************************************** */
router.patch('/:layoutId', async(req, res)=>{
    try{
        
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});


/** ********************************************
 * GET Endpoint to get all Layouts
 ******************************************** */
router.get('/', async(req, res)=>{
    try{
        const layouts = await Layout.find().populate('zones').populate('devices').populate('deviceGroups');
        res.json(layouts);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

/** ********************************************
 * GET Endpoint to get a specific Layout by ID
 ******************************************** */
router.get('/:layoutId', async(req, res)=>{
    try{
        const layout = await Layout.findById(req.params.layoutId).populate('zones').populate('devices').populate('deviceGroups');
        if(!layout){
            return res.status(404).json({ message: 'Layout not found!'});
        }
        res.json(layout);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;