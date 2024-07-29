import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: { type: String, repuired: true },
    desc: { type: String, repuired: true },
    bgColour: { type: String, repuired: true },
    image: { type: String, repuired: true }
});

const albumModel = mongoose.models.album || mongoose.model("album", albumSchema);

export default albumModel;