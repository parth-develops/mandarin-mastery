"use server";

import { connectToDatabase } from '../utils/db';
import Users from './user.model';

export async function enrollUserInChapter(userId, chapterId) {
    try {
        await connectToDatabase();
        // Fetch the user by ID
        const user = await Users.findById(userId);

        // If the user is found, enroll them in the chapter
        if (user) {
            await user.enrollInChapter(chapterId);
            console.log(`User ${user.username} enrolled in chapter with ID: ${chapterId}`);
        }
    } catch (err) {
        console.error('Error enrolling user in chapter:', err);
    }
}

export async function markChapterAsComplete(userId, chapterId) {
    console.log("we here");
    try {
        await connectToDatabase();
        // Fetch the user by ID
        const user = await Users.findById(userId);

        // If the user is found, enroll them in the chapter
        if (user) {
            await user.completeChapter(chapterId);
            console.log(`User ${user.username} completed chapter with ID: ${chapterId}`);
        }
    } catch (err) {
        console.error('Error completing chapter:', err);
    }
}