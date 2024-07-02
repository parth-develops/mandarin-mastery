"use client";

import Image from 'next/image';
import { useState } from 'react';
import parisImg from "@/assets/img/paris.jpg"
import { recordQuizResult } from '@/app/lib/utils';
import { useSession } from 'next-auth/react';
import { fetchUserData } from '@/app/lib/data';

export default function QuizUi({ quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz[0].questions.length).fill(null));
    const [score, setScore] = useState(null);
    const { data: session, status, update } = useSession();

    const handleAnswerChange = (answer) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;
        quiz[0].questions.forEach((question, index) => {
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (correctAnswer && selectedAnswers[index] === correctAnswer.text) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);

        const isPassed = (correctAnswers / quiz[0].questions.length) === 1;

        await recordQuizResult(session.user.id, quiz[0].id, isPassed, correctAnswers);
        const newUserSession = await fetchUserData(session.user.id);
        await update({ ...session, user: newUserSession });
    };

    const question = quiz[0].questions[currentQuestionIndex];

    return (
        <div className="flex">
            <div className="w-1/2 p-8 bg-blue-100">
                <h2 className="text-2xl font-bold">Step {currentQuestionIndex + 1}/{quiz[0].questions.length}</h2>
                <p className="mt-4 text-xl">{question.questionText}</p>
            </div>
            <div className="w-1/2 p-8">
                {question.picture && <Image priority={true} src={parisImg} alt="question" className="mb-4" />}
                {question.audio && <audio src={question.audio} className="mb-4"></audio>}
                <div className="space-y-4">
                    {question.answers.map((answer, index) => (
                        <label key={index} className="block">
                            <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={answer.text}
                                checked={selectedAnswers[currentQuestionIndex] === answer.text}
                                onChange={() => handleAnswerChange(answer.text)}
                                className="mr-2"
                            />
                            {answer.text}
                        </label>
                    ))}
                </div>
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={handlePrevious}
                        className={`px-4 py-2 bg-gray-300 rounded ${currentQuestionIndex === 0 ? 'hidden' : ''}`}
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < quiz[0].questions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Submit
                        </button>
                    )}
                </div>
                {score !== null && (
                    <div className="mt-8">
                        <h3 className="text-2xl">Your score: {score} / {quiz[0].questions.length}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
