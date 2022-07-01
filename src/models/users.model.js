const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: String,
    /*
    rol: {
        ref: "Roles",
        type: mongoose.Schema.Types.ObjectId,
    },
    */
    rol: String,
    password: String ,
    blackListToken: Array
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, recivePassword) => {
    return await bcrypt.compare(password, recivePassword);
}

module.exports = mongoose.model("Users", userSchema);