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
        console.error('Error fetching user chapters:', err);
    }
}