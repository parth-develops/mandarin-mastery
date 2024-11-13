import Users from "@/app/lib/user.model";
import { connectToDatabase } from "@/app/utils/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LuMailCheck, LuMailWarning } from "react-icons/lu";

export default async function VerifyEmailPage({ searchParams }) {
    let message = 'Verifying email...'
    let verified = false
    if (searchParams.token) { // Checks if a verification token is provided in the URL.
        // Attempts to find a user in the database with the provided email verification token.
        await connectToDatabase();

        const user = await Users.findOne({ emailVerificationToken: searchParams.token })

        // Conditionally updates the message and verified status based on the user lookup.
        if (!user) {
            message = 'User not found. Check your email for the verification link.'
        } else {
            // If the user is found, updates the user record to mark the email as verified.
            user.emailVerificationToken = null;
            user.emailVerified = true;

            await user.save()

            message = `Email verified! ${user.email}`
            verified = true // Sets the verified status to true.
        }
    } else {
        // Updates the message if no verification token is found.
        message = 'No email verification token found. Check your email.'
    }

    return (
        <div className='grid place-content-center py-40'>
            <Card className='max-w-sm text-center'>
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='w-full grid place-content-center py-4'>
                        {verified ? <LuMailCheck size={56} /> : <LuMailWarning size={56} />}
                    </div>
                    <p className='text-lg text-muted-foreground' style={{ textWrap: 'balance' }}>
                        {message}
                    </p>
                </CardContent>
                <CardFooter>
                    {verified && (
                        // Displays a sign-in link if the email is successfully verified.
                        <Link href={'/signin'} className='bg-primary text-white text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 rounded-lg w-full text-center'>
                            Sign in
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}