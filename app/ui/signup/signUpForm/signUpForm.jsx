"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/lib/actions";

// import { Icons } from "@/components/icons"
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
        <Card className="w-[350px]">
            <form action={action}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button type="button" variant="outline">
                            Github
                        </Button>
                        <Button type="button" variant="outline">
                            {/* <Icons.google className="mr-2 h-4 w-4" /> */}
                            Google
                        </Button>
                    </div>
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
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Create account</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
