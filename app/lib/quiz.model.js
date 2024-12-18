import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    picture: { type: String, required: false },
    audio: { type: String, required: false },
    answers: [answerSchema],
});

const quizSchema = new mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    questions: [questionSchema],
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

let Quizzes;
try {
    Quizzes = mongoose.model("quizzes");
} catch (e) {
    Quizzes = mongoose.model("quizzes", quizSchema);
}

export default Quizzes;
