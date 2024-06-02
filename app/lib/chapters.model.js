import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  english: { type: String, required: true },
  chinese: { type: String, required: true },
  pinyin: { type: String, required: true }
});

const chapterSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: {
    minimum: [translationSchema],
    brave: [translationSchema],
    more: [translationSchema]
  }
});

let Chapters;
try {
  Chapters = mongoose.model("chapters");
} catch (e) {
  Chapters = mongoose.model("chapters", chapterSchema);
}

export default Chapters;