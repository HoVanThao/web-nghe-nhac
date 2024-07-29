import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: { type: String, repuired: true },
    desc: { type: String, repuired: true },
    album: { type: String, repuired: true },
    image: { type: String, repuired: true },
    file: { type: String, repuired: true },
    duration: { type: String, repuired: true }
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;