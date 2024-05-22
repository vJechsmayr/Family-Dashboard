const mongoose = require('mongoose');
const Device = require('./Device');

const deviceGroupSchema = new mongoose.Schema({
    deviceGroupId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    devices: { type: mongoose.Schema.Types.ObjectId, ref:'Device' }
});

module.exports = mongoose.model('DeviceGroup', deviceGroupSchema);