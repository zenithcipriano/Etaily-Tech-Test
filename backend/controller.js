import mongoose from 'mongoose';

const User = new mongoose.model("User", {
    // userId: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, required: true }
});

export {mongoose, User}