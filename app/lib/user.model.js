import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizzes" },
  isTaken: { type: Boolean, default: false },
  isPassed: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, },
  emailVerificationToken: { type: String, default: "" },
  emailVerified: { type: Boolean, default: false },
  passwordResetToken: { type: String, default: "" },
  password: {
    type: String,
    required: function () {
      return !this.discordId; 
    },
  },
  discordId: { type: String, unique: true, sparse: true },
  userImg: { type: String },
  chapters: [
    {
      chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'chapters' },
      isCompleted: { type: Boolean, default: false },
      slug: { type: String, default: "" }
    }
  ],
  quizzes: [quizResultSchema],
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

userSchema.methods.recordQuizResult = function (quizId, isPassed, score) {
  const quizResult = this.quizzes.find(q => q.quiz.equals(quizId));
  if (!quizResult) {
    this.quizzes.push({ quiz: quizId, isTaken: true, isPassed, score });
  } else {
    quizResult.isTaken = true;
    quizResult.isPassed = isPassed;
    quizResult.score = score;
  }
  return this.save();
};

let Users;
try {
  Users = mongoose.model("Users");
} catch (e) {
  Users = mongoose.model("Users", userSchema);
}

export default Users;
