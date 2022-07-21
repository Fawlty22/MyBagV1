const { Schema, model } = require('mongoose');

const discSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true
        },
        name:{
            type: String,
            required: true,
        },
        speed: {
            type: String,
            required: true,
        },
        glide: {
            type: String,
            required: true,
        },
        turn: {
            type: String,
            required: true,
        },
        fade: {
            type: String,
            required: true,
        },
        inBag: {
            type: Boolean,
            required: true,
            default: false
        },
        flightPath:{
            type: String,
            required: true,
        },
        flightType:{
            type: String,
            required: true,
        }
    }, 
    {
        toJSON: {
            virtuals: false
        }
    }
);


module.exports = discSchema;