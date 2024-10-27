import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next-nprogress-bar";

export function ResultModal({ open, setOpen, score, isPassed, totalQuestions }) {
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
        router.push("/dashboard")
    }

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Quiz Result</AlertDialogTitle>
                    <AlertDialogDescription>
                        <span className="block">Your score is {`${score}/${totalQuestions}`}.</span>
                        {
                            isPassed ? <span className="block">Yay, you have passed this quiz! Well done.</span> :
                                <span className="block">Unfortunately you have failed this quiz attempt, but it&apos;s okay you tried. We recommend going through the chapter again, thoroughly.</span>
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
