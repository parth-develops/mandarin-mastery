"use client";

import Image from 'next/image';
import { useState } from 'react';
import parisImg from "@/assets/img/paris.jpg"
import { recordQuizResult } from '@/app/lib/utils';
import { useSession } from 'next-auth/react';
import { fetchUserData } from '@/app/lib/data';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function QuizUi({ quiz }) {
    console.log(quiz);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz?.questions.length).fill(null));
    const [score, setScore] = useState(null);
    const { data: session, status, update } = useSession();

    console.log(selectedAnswers);

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
        quiz.questions.forEach((question, index) => {
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (correctAnswer && selectedAnswers[index] === correctAnswer.text) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);

        const isPassed = (correctAnswers / quiz.questions.length) === 1;

        await recordQuizResult(session.user.id, quiz.id, isPassed, correctAnswers);
        const newUserSession = await fetchUserData(session.user.id);
        await update({ ...session, user: newUserSession });
    };

    const question = quiz?.questions[currentQuestionIndex];

    if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) {
        return <div>Invalid quiz data</div>;
    }

    return (
        <div className="flex flex-1 ">
            <div className="w-1/2 p-8 bg-blue-100 content-center">
                <h4 className="font-bold text-black/60">Question {currentQuestionIndex + 1}/{quiz.questions.length}</h4>
                <p className="mt-4 text-3xl font-bold">{question.questionText}</p>
                <small className='font-semibold text-black/60'>Select one answer</small>
            </div>
            <div className="w-1/2 p-8 content-center">
                {question.picture && <Image priority={true} src={parisImg} alt="question" className="mb-4" />}
                {/* {question.audio && <audio src={question.audio} className="mb-4"></audio>} */}
                <div className="space-y-4">
                    <RadioGroup>
                        {question.answers.map((answer, index) => (
                            <div key={answer.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={`question-${currentQuestionIndex}`} id={answer.id}
                                    name={`question-${currentQuestionIndex}`}
                                    checked={selectedAnswers[currentQuestionIndex] === answer.text}
                                    onClick={() => handleAnswerChange(answer.text)}
                                />
                                <Label htmlFor={answer.id}>{answer.text}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <div className="mt-8 flex">
                    <button
                        onClick={handlePrevious}
                        className={`px-4 mr-auto py-2 bg-gray-300 rounded ${currentQuestionIndex === 0 ? 'hidden' : ''}`}
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < quiz.questions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="px-4 ml-auto py-2 bg-blue-500 text-white rounded"
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
                        <h3 className="text-2xl">Your score: {score} / {quiz.questions.length}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}