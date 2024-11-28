import { Button, buttonVariants } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import Link from "next/link";

const words = "Your Personalized Chinese Learning Platform";

export default function Hero() {
    return (
        <section className="text-center container">
            <h1 className=" text-3xl lg:text-5xl inline-block relative font-semibold animate-in before:content-[''] before:absolute before:h-[25%] before:w-full before:bg-primary before:bottom-[0] before:-z-10 leading-none mb-3">Mandarin Mastery</h1>
            <TextGenerateEffect words={words} fontSize="text-4xl lg:text-5xl" className="mb-4" />
            <p className="md:text-xl">Welcome to Mandarin Mastery, your ultimate destination for mastering Mandarin Chinese in an interactive and engaging way! Mandarin Mastery is a web application designed to make learning Mandarin fun, efficient, and personalized. Whether you&apos;re a beginner or looking to improve your existing skills, Mandarin Mastery has something for everyone.</p>

            <div className="w-fit mx-auto mt-10">
                <Link className={`${buttonVariants({ variant: "default", size: "default" })} flex w-full mb-3`} href="/signup">GET STARTED</Link>
                <Link className={`${buttonVariants({ variant: "outline", size: "default" })} flex w-full`} href="/signin">I ALREADY HAVE AN ACCOUNT</Link>
            </div>
        </section>
    )
}
