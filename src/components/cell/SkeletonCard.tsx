import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="relative ">
      <Skeleton className="h-[150px] w-[150px] rounded-full absolute top-[-50px] left-[70px]" />

      <Skeleton className="h-[325px] w-[300px] rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="absolute h-4 w-[250px]" />
        <Skeleton className="absolute h-4 w-[200px]" />
      </div>
    </div>
  );
}
