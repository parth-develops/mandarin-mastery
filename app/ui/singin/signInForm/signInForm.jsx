"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, discordLogin } from '@/app/lib/actions';
import { useForm } from "react-hook-form";

export default function SignInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    const action = handleSubmit(async (data) => {
        const response = await dispatch(data);
        console.log("UserData", data);
    });

    return (
        <form action={action}>
            <h2>Sign In</h2>
            <input {...register("email", { required: true })} type="email" placeholder="Email" />
            {errors.email && <span className="error">Email is required</span>}
            <input {...register("password", { required: true })} type="password" placeholder="Password" />
            {errors.password && <span className="error">Password is required</span>}
            <button type="submit">Sign In</button>
            <button type='button' onClick={() => discordLogin()}>Login with Discord</button>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </form>
    )
}
