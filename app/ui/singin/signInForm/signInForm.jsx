"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, discordLogin } from '@/app/lib/actions';
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaDiscord } from "react-icons/fa";

export default function SignInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    const action = handleSubmit(async (data) => {
        const response = await dispatch(data);
        console.log("UserData", data);
    });

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="error">Email is required</span>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" {...register("password", { required: true })} />
                                {errors.password && <span className="error">Password is required</span>}
                                <div
                                    className="flex items-end space-x-1"
                                    aria-live="polite"
                                    aria-atomic="true"
                                >
                                    {errorMessage && (
                                        <>
                                            <p className="text-sm text-red-500">{errorMessage}</p>
                                        </>
                                    )}
                                </div>
                                <Buttons />
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

function Buttons() {
    const { pending } = useFormStatus();

    return (
        <>
            <Button disabled={pending ? true : false} aria-disabled={pending} type="submit" className={`w-full ${pending ? "disabled:opacity-50" : ""}`}>
                Login
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button disabled={pending ? true : false} aria-disabled={pending} type="button" variant="outline" className={`w-full ${pending ? "disabled:opacity-50" : ""}`} onClick={() => discordLogin()}>
                <FaDiscord size={20} className='mr-1' /> Discord
            </Button>
        </>
    );
}
