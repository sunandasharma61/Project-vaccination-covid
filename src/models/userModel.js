
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
            trim: true,
        },

        lname: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
        },
        aadharNo: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },
        pincode: {
            type: Number,
            required: true,

        }, status: {
            firstDose: {
                type: Boolean,
                default: false
            },
            secondDose: {
                type: Boolean,
                default: false
            }
        },
        center: {
            type: ObjectId,
            ref: "Center",
            trim: true,

        },
        registeredSlot: {
            date: {
                type: Date
            },
            time: {
                type: String
            }
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
