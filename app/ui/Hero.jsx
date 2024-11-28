import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import Link from "next/link";

const words = "Your Personalized Chinese Learning Platform";

export default function Hero() {
    return (
        <section className="text-center">
            <h1 className="text-[40px] inline-block relative font-semibold animate-in before:content-[''] before:absolute before:h-[10px] before:w-full before:bg-primary before:bottom-[0] before:-z-10 leading-none mb-3">Mandarin Mastery</h1>
            <TextGenerateEffect words={words} fontSize="text-5xl" className="mb-4" />
            <p className="text-xl">Welcome to Mandarin Mastery, your ultimate destination for mastering Mandarin Chinese in an interactive and engaging way! Mandarin Mastery is a web application designed to make learning Mandarin fun, efficient, and personalized. Whether you&apos;re a beginner or looking to improve your existing skills, Mandarin Mastery has something for everyone.</p>

            <div className="w-max mx-auto">
                <Button className="block mt-6 mb-4 w-full"><Link className="w-full block" href="/signup">GET STARTED</Link></Button>
                <Button className="block" variant="outline"><Link className="w-full block" href="/signin">I ALREADY HAVE AN ACCOUNT</Link></Button>
                <Link href="x">HIIII</Link>
            </div>
        </section>
    )
}
