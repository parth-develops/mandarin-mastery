"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useState } from "react"
import { useFormStatus } from 'react-dom';
import { forgotPassword } from "../lib/actions"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [actionResponse, setActionResponse] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const action = handleSubmit(async (data) => {
        setActionResponse({});

        try {
            const response = await forgotPassword(undefined, data);
            console.log(response);

            setActionResponse(response);

            if (response?.success) {
                setDialogOpen(true);
                reset()
            }
        } catch (error) {
            setActionResponse({ success: false, message: "An unexpected error occured" });
            console.error(error);
        }
    });

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                            Forgot your password?
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>
                    <form className="space-y-6" action={action}>
                        <div>
                            <Label htmlFor="email" className="sr-only">
                                Email address
                            </Label>
                            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="Email address"
                                {...register("email", { required: "Please enter an email" })}
                            />
                            <p className="text-[12px] leading-[1.1] text-red-700">{errors.email?.message}</p>
                        </div>
                        {actionResponse.length !== 0 && !actionResponse.success && (
                            <div
                                className="flex items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <>
                                    <p className="text-sm text-red-500">{actionResponse.message}</p>
                                </>
                            </div>
                        )}
                        <Buttons />
                    </form>
                    <div className="flex justify-center">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            prefetch={false}
                        >
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Next Step</DialogTitle>
                        <DialogDescription>
                            {actionResponse.message}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

function Buttons() {
    const { pending } = useFormStatus();

    return <Button loading={pending ? true : false} type="submit" className="w-full">
        Send Reset Link
    </Button>
}