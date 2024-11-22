"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from "react-hook-form";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react';

export default function SignupForm() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [actionResponse, setActionResponse] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const action = handleSubmit(async (data) => {
        setActionResponse(null);

        try {
            const response = await createUser(undefined, data);

            if (response?.success) {
                setDialogOpen(true);
                reset()
            } else {
                setActionResponse(response.error);
            }
        } catch (error) {
            setActionResponse("An unexpected error occured");
            console.error(error);
        }
    });

    const usernameValidationString = "Please enter a username between 3 and 15 characters";
    const passwordValidationString = "Password must be between 8 and 20 characters";

    return (
        <>
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
                            <Input {...register("password", { required: { value: true, message: passwordValidationString }, maxLength: { value: 20, message: passwordValidationString }, minLength: { value: 8, message: passwordValidationString }, pattern: { value: /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,20}$/, message: "Password must have atleast one special character" } })} id="password" type="password" />
                            <p className="text-[12px] leading-[1.1] text-red-700">{errors.password?.message}</p>
                        </div>
                        {actionResponse && (
                            <div
                                className="flex items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <>
                                    <p className="text-sm text-red-500">{actionResponse}</p>
                                </>
                            </div>
                        )}
                        <CreateAccountButton />
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Next Step</DialogTitle>
                        <DialogDescription>
                            Please check your inbox for an email to verify you email through the verification link.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

function CreateAccountButton() {
    const { pending } = useFormStatus();

    return <Button loading={pending ? true : false} type="submit" className="w-full">Create account</Button>
}
