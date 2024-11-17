"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { resetPassword } from '@/app/lib/actions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link';

export default function ResetPasswordForm({ token }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [actionResponse, setActionResponse] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);

    const action = handleSubmit(async (data) => {
        setActionResponse({});

        try {
            const response = await resetPassword(undefined, data);

            if (response?.success) {
                reset();
                setActionResponse(response);
                setDialogOpen(true);
            }
        } catch (error) {
            setActionResponse({ success: false, message: "An unexpected error occured" });
            console.error(error);
        }
    });

    const passwordValidationString = "Password must be between 8 and 20 characters";

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                            Reset your password
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Please enter your new desired password.
                        </p>
                    </div>
                    <form className="space-y-6" action={action}>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                New Password
                            </Label>
                            <Input id="password" name="password" type="password" placeholder="Password"
                                {...register("password", { required: { value: true, message: passwordValidationString }, maxLength: { value: 20, message: passwordValidationString }, minLength: { value: 8, message: passwordValidationString }, pattern: { value: /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,20}$/, message: "Password must have atleast one special character" } })}
                            />
                            <input type="hidden" name="resetToken" {...register("resetToken", { value: token })} />
                            <p className="text-[12px] leading-[1.1] text-red-700">{errors.password?.message}</p>
                        </div>
                        {actionResponse.length !== 0 && !actionResponse?.success && (
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
                </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Next Step</DialogTitle>
                        <DialogDescription>
                            {actionResponse.message} Click here to <Link href="/login" className='underline text-primary'>login</Link>
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
        Reset Password
    </Button>
}
