import { Button } from "@/components/ui/button";

export default function Chapters() {
    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-semibold md:text-2xl mb-4">Chapters</h1>
            <div className="cards p-4 flex-1 flex gap-4 border rounded-lg shadow-sm">
                <div>
                    <h3 className="mb-2">Chapter 1</h3>
                    <p className="mb-2">Description</p>
                    <Button>Enroll</Button>
                </div>
            </div>
        </div>
    )
}
