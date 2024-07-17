import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

export function ResultModal({ open, setOpen, score, isPassed, totalQuestions }) {
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        router.push("/dashboard")
    }

    return (
        <AlertDialog open={open}>
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Quiz Result</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Your score is {`${score}/${totalQuestions}`}</p>
                        {
                            isPassed ? <p>Yay, you have passed this quiz! Well done.</p> :
                                <p>Unfortunately you have failed this quiz attempt, but it&apos;s okay you tried. We recommend going through the chapter again, thoroughly.</p>
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleClose}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
