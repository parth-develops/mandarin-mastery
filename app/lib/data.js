"use server"

import { connectToDatabase } from "../utils/db";
import Chapters from "./chapters.model";
import Quizzes from "./quiz.model";
import Users from "./user.model";

export const fetchChapters = async () => {
    try {
        await connectToDatabase();

        const chapters = await Chapters.find({}, "slug title").exec();
        return chapters;
    } catch (error) {
        console.error(error);
    }
}

export const fetchChapterBySlug = async (chapterSlug) => {
    try {
        await connectToDatabase();

        const chapter = await Chapters.findOne({ slug: chapterSlug }).exec();
        return chapter;
    } catch (error) {
        console.error('Error fetching chapter by slug: ', error);
    }
}

export const fetchUserChapter = async (userId) => {
    try {
        await connectToDatabase();

        const userChapters = await Users.findById(userId, 'chapters').exec();

        return userChapters ? userChapters : [];
    } catch (error) {
        console.error('Error fetching user chapters:', error);
    }
}

export const fetchUserData = async (userId) => {
    try {
        await connectToDatabase();
        const user = await Users.findById(userId);

        if (!user) {
            return null;
        }

        const plainUser = user.toObject();
        const plainUserChapters = plainUser.chapters.map(chapter => ({
            chapter: chapter.chapter.toString(),
            isCompleted: chapter.isCompleted,
            slug: chapter.slug,
            id: chapter._id.toString()
        }));

        const plainQuizzes = plainUser.quizzes.map(quiz => ({
            quiz: quiz.quiz.toString(),
            isTaken: quiz.isTaken,
            isPassed: quiz.isPassed,
            score: quiz.score,
        }));

        return {
            id: plainUser._id.toString(),
            email: plainUser.email,
            username: plainUser.username,
            userChapters: plainUserChapters,
            quizzes: plainQuizzes,
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export const fetchQuizzes = async () => {
    try {
        await connectToDatabase();
        const quizzes = await Quizzes.find({}, "chapter slug").lean().exec();

        if (!quizzes) {
            return null;
        }

        const plainQuizzes = quizzes.map((quiz) => {
            return {
                id: quiz._id.toString(),
                chapter: quiz.chapter,
                slug: quiz.slug,
            }
        })

        return plainQuizzes;
    } catch (error) {
        console.error('Error fetching quizzes: ', error);
    }
}

export const fetchQuizBySlug = async (quizSlug) => {
    try {
        await connectToDatabase();
        const quiz = await Chapters.findOne({ slug: quizSlug }).exec();

        if (!quiz) {
            return null;
        }

        console.log("quiz by slug", quiz);
    } catch (error) {
        console.error('Error fetching quiz by slug: ', error);
    }
}