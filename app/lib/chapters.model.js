import mongoose from "mongoose";

const chaptersSchema = new mongoose.Schema({
    title: "String",
    content: "String"
})

let Chapters;
try {
  Chapters = mongoose.model("chapters");
} catch (e) {
  Chapters = mongoose.model("chapters", chaptersSchema);
}

export default Chapters;