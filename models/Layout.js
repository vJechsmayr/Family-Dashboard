const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layoutSchema = new Schema({
    name: String,
    zones: [{ type: Schema.Types.ObjectId, ref: 'Zone' }],
    devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
    deviceGroups: [{ type: Schema.Types.ObjectId, ref: 'DeviceGroup' }],
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Layout', layoutSchema);