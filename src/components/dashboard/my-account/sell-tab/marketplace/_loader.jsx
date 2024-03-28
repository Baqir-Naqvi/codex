import { Skeleton } from "@/components/ui/skeleton";

const  TableSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col space-y-4 mt-10">
                <Skeleton className="h-4 w-full rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-y-2">
                <div className="flex flex-col gap-y-4">
                    <div className="text-lg font-bold">
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="text-lg font-bold">
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="text-lg font-bold">
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableSkeleton;