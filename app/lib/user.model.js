import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  discordId: {
    type: String,
    unique: true,
    sparse: true,
  },
  userImg: {
    type: String,
    required: false,
  },
  chapters: [{
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'chapters' },
    isCompleted: { type: Boolean, default: false },
    slug: { type: String, default: "" }
  }],
});

userSchema.methods.enrollInChapter = function (chapterId, chapterSlug) {
  const enrolledChapter = this.chapters.find(c => c.chapter.equals(chapterId));
  if (!enrolledChapter) {
    this.chapters.push({ chapter: chapterId, slug: chapterSlug });
    return this.save();
  }
};

userSchema.methods.completeChapter = function (chapterId) {
  const enrolledChapter = this.chapters.find(c => c.chapter.equals(chapterId));
  if (enrolledChapter && !enrolledChapter.isCompleted) {
    enrolledChapter.isCompleted = true;
    return this.save();
  }
};

let Users;
try {
  Users = mongoose.model("Users");
} catch (e) {
  Users = mongoose.model("Users", userSchema);
}

export default Users;