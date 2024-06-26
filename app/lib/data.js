"use server"

import { connectToDatabase } from "../utils/db";
import Chapters from "./chapters.model";
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
        console.error(error);
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
        const plainUserChapters = plainUser.chapters.map(chapter => {
    
            return {
                chapter: chapter.chapter.toString(),
                isCompleted: chapter.isCompleted,
                slug: chapter.slug,
                id: chapter._id.toString()
            };
        }); 

        return {
            id: plainUser._id.toString(),
            email: plainUser.email,
            username: plainUser.username,
            userChapters: plainUserChapters,
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}