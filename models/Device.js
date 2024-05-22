const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: { type: String, unique: true },
    name: String,
    location: String,
    status: { tpye: String, enum: ['active', 'inactive', 'maintenance']},
    orientation:  { type: String, enum: ['landscape', 'portrait'], default: 'landscape'},
    resolution: { type: String }
});

module.exports = mongoose.model('Device', deviceSchema);