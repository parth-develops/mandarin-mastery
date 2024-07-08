"use server";

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../utils/db';
import Users from './user.model';
import { redirect } from 'next/navigation';

export async function enrollUserInChapter(userId, chapterId, chapterSlug) {
    try {
        await connectToDatabase();
        const user = await Users.findById(userId);

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
        const user = await Users.findById(userId);

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

export async function recordQuizResult(userId, quizId, isPassed, score) {
    try {
        await connectToDatabase();
        const user = await Users.findById(userId);

        if (user) {
            await user.recordQuizResult(quizId, isPassed, score);
            console.log(`User ${user.username} took quiz with ID: ${quizId}`);
        }
    } catch (error) {
        console.error('Error recording quiz result:', error);
    }
}