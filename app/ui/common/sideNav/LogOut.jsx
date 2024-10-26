"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from 'react-dom'
import {
    AlertDialogCancel
} from "@/components/ui/alert-dialog"

export default function LogOut() {
    const { pending } = useFormStatus()

    return (
        <div className="flex gap-4">
            <AlertDialogCancel disabled={pending ? true : false} className="disabled:cursor-not-allowed">Cancel</AlertDialogCancel>
            <Button loading={pending ? true : false} className="w-full" type="submit">
                Yes
            </Button>
        </div>
    )
}
