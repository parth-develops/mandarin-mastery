"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link';

export default function SignupForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, dispatch] = useFormState(createUser, undefined);

    const action = handleSubmit(async (data) => {
        const response = await dispatch(data);
        router.push("/signin");
    });

    return (
        <Card className="mx-auto max-w-[350px]">
            <form action={action}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input {...register("username", { required: true })} type="text" placeholder="username" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email", { required: true })} type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password", { required: true })} id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full">Create account</Button>
                </CardContent>
                <CardFooter>
                    <div className="mx-auto text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
