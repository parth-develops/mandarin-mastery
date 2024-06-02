import { connectToDatabase } from "../utils/db";
import Chapters from "./chapters.model";

export const fetchChapters = async () => {
    try {
        connectToDatabase();

        const chapters = await Chapters.find({}, "slug title").exec();
        return chapters;
    } catch (error) {
        console.error(error);
    }
}

export const fetchChapterBySlug = async (chapterSlug) => {
    try {
        connectToDatabase();

        const chapter = await Chapters.findOne({ slug: chapterSlug }).exec();
        return chapter;
    } catch (error) {
        console.error(error);
    }
}