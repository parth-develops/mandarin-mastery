"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions";

export default function SignupForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, dispatch] = useFormState(createUser, undefined);

    const action = handleSubmit(async (data) => {

        console.log("formdata", data);
        const response = await dispatch(data);
        console.log("response", response);
        router.push("/signin");
    }); 

    return (
        <form action={action}>
            <h2>Signup</h2>
            <input {...register("username", { required: true })} type="text" placeholder="Username" className='text-black' />
            {errors.email && <span className="error">Username is required</span>}
            <input {...register("email", { required: true })} type="email" placeholder="Email" className='text-black' />
            {errors.email && <span className="error">Email is required</span>}
            <input {...register("password", { required: true })} type="password" placeholder="Password" className='text-black' />
            {errors.password && <span className="error">Password is required</span>}
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
            <button type="submit">Signup</button>
        </form>
    );
}
