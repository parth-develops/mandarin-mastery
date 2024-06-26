"use server";

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../utils/db';
import Users from './user.model';
import { redirect } from 'next/navigation';

export async function enrollUserInChapter(userId, chapterId, chapterSlug) {
    try {
        await connectToDatabase();
        // Fetch the user by ID
        const user = await Users.findById(userId);

        // If the user is found, enroll them in the chapter
        if (user) {
            await user.enrollInChapter(chapterId, chapterSlug);
            console.log(`User ${user.username} enrolled in chapter with ID: ${chapterId}`);
        }
    } catch (err) {
        console.error('Error enrolling user in chapter:', err);
    }
}

export async function markChapterAsComplete(userId, chapterId) {
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

    // revalidatePath("/dashboard/chapters");
    // redirect("/dashboard/chapters");
}