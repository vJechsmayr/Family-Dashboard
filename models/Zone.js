const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zoneSchema = new Schema({
    name: String,
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
    widgetId: { type: Schema.Types.ObjectId, ref: 'ContentWidget'}
});

module.exports = mongoose.model('Zone', zoneSchema);