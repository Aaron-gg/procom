const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("Roles", roleSchema);