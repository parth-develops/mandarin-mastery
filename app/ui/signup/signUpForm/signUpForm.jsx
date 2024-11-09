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

    const usernameValidationString = "Please enter a username between 3 and 15 characters";
    const passwordValidationString = "Password must be between 8 and 20 characters";

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
                        <Input {...register("username", { required: usernameValidationString, minLength: { value: 3, message: usernameValidationString }, maxLength: { value: 15, message: usernameValidationString }, pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Username must contain only letters, numbers and _" } })} type="text" id="username" placeholder="username" />
                        <p className="text-[12px] leading-[1.1] text-red-700">{errors.username?.message}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email", { required: "Please enter email", pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Please enter a valid email" } })} type="email" id="email" placeholder="m@example.com" />
                        <p className="text-[12px] leading-[1.1] text-red-700">{errors.email?.message}</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password", { required: { value: true, message: passwordValidationString }, maxLength: { value: 20, message: passwordValidationString }, minLength: { value: 8, message: passwordValidationString }, pattern: { value: /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8}$/, message: "Password must have atleast one special character" } })} id="password" type="password" />
                        <p className="text-[12px] leading-[1.1] text-red-700">{errors.password?.message}</p>
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
