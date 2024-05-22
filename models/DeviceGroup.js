const mongoose = require('mongoose');
const Device = require('./Device');

const deviceGroupSchema = new mongoose.Schema({
    deviceGroupId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    devices: { type: [String] }
});

module.exports = mongoose.model('DeviceGroup', deviceGroupSchema);