import { connectToDatabase } from '@/app/utils/db';
import Users from '@/app/lib/user.model';
import ResetPasswordForm from '@/app/ui/auth/ResetPasswordForm';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ResetPassword({ searchParams }) {
    if (searchParams.token) {
        await connectToDatabase();

        const user = await Users.findOne({ passwordResetToken: searchParams.token })

        if (!user) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
                    <div className="mx-auto w-full max-w-md space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                                Invalid Reset Link
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                                Your password reset link has been expired or invalid. Please try again.
                            </p>
                        </div>
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
            )
        } else {
            return <ResetPasswordForm token={searchParams.token} />
        }
    } else {
        redirect("/signin");
    }
}