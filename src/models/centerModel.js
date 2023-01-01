
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        CenteName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        pincode: {
            type: Number,
            required: true,

        },
        avalableSlots: {
            type: [Number],
            default: [10, 10.30, 11, 11.30, 12, 12.30, 1, 1.30, 2, 2.30, 3, 3.30, 4, 4.30]

        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Center", userSchema);
