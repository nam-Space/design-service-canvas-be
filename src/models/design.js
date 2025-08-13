const mongoose = require('mongoose')

const DesignSchema = new mongoose.Schema({
    userId: String,
    email: String,
    name: String,
    canvasData: String,
    width: Number,
    height: Number,
    category: String,
    publicFor: {
        type: [{
            email: {
                type: String,
                required: true,
            },
            permission: {
                type: String,
                enum: ['view', 'edit'],
            }
        }],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Design = mongoose.model.Design || mongoose.model('Design', DesignSchema)
module.exports = Design