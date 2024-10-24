"use client";

import Image from 'next/image';
import { useState } from 'react';
import parisImg from "@/assets/img/paris.jpg"
import { recordQuizResult } from '@/app/lib/utils';
import { useSession } from 'next-auth/react';
import { fetchUserData } from '@/app/lib/data';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResultModal } from './resultModal';
import { Button } from '@/components/ui/button';

export default function QuizUi({ quiz }) {
    const totalQuestions = quiz?.questions.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz?.questions.length).fill(null));
    const [score, setScore] = useState(null);
    const [isPassed, setIsPassed] = useState(false);
    const [open, setOpen] = useState(false);
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
        setIsPassed(isPassed);

        await recordQuizResult(session.user.id, quiz.id, isPassed, correctAnswers);
        const newUserSession = await fetchUserData(session.user.id);
        await update({ ...session, user: newUserSession });

        setOpen(true);
    };

    const question = quiz?.questions[currentQuestionIndex];

    if (!quiz || !quiz.questions || !Array.isArray(quiz.questions)) {
        return <div>Invalid quiz data</div>;
    }

    return (
        <div className="flex flex-auto h-0">
            <ResultModal open={open} setOpen={setOpen} score={score} isPassed={isPassed} totalQuestions={totalQuestions} />
            <div className="w-1/2 p-8 bg-primary/20 content-center">
                <h4 className="font-bold text-primary/60">Question {currentQuestionIndex + 1}/{quiz.questions.length}</h4>
                <p className="mt-4 text-3xl text-primary font-bold">{question.questionText}</p>
                <small className='font-semibold text-primary/60'>Select one answer</small>
            </div>
            <div className="w-1/2 px-8 flex flex-col">
                <div className='m-auto'>
                    {question.picture && <Image priority={true} src={parisImg} alt="question" className="mb-4 max-w-[100%]" />}
                    {/* {question.audio && <audio src={question.audio} className="mb-4"></audio>} */}
                </div>
                <div className="wrapper mt-auto">
                    <div className="space-y-4">
                        <RadioGroup>
                            {question.answers.map((answer, index) => {
                                const isChecked = selectedAnswers[currentQuestionIndex] === answer.text;

                                return <div key={answer.id} className={`flex items-center space-x-4 border-2 p-4 rounded-xl ${isChecked ? "border-primary bg-primary/10" : "border-primary/40"}`}
                                    onClick={() => handleAnswerChange(answer.text)}
                                >
                                    <RadioGroupItem value={`question-${currentQuestionIndex}`} id={answer.id}
                                        name={`question-${currentQuestionIndex}`}
                                        checked={isChecked}
                                        readOnly
                                    />
                                    <Label htmlFor={answer.id}>{answer.text}</Label>
                                </div>
                            })}
                        </RadioGroup>
                    </div>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <Button
                            variant={"outline"}
                            onClick={handlePrevious}
                            className={`border-2 border-primary`}
                            disabled={currentQuestionIndex === 0 ? true : false}
                        >
                            Previous
                        </Button>
                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <Button
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}