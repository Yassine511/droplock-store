import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-4 pt-12 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero skeleton */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-12 w-56 bg-dl-surface" />
          <Skeleton className="h-12 w-40 bg-dl-surface" />
          <Skeleton className="h-12 w-32 bg-dl-surface" />
          <Skeleton className="h-4 w-72 mt-4 bg-dl-surface" />
          <Skeleton className="h-px w-full mt-6 bg-dl-surface" />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex items-center gap-2 mb-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full bg-dl-surface" />
          ))}
        </div>

        {/* Grid skeleton — matching exact card proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-dl-surface border-[0.5px] border-dl-border overflow-hidden">
              <Skeleton className="aspect-[4/3] bg-dl-surface-2" />
              <div className="p-4 space-y-2.5">
                <Skeleton className="h-3.5 w-3/4 bg-dl-surface-2" />
                <Skeleton className="h-3 w-full bg-dl-surface-2" />
                <div className="flex justify-between items-center pt-1">
                  <Skeleton className="h-4 w-20 bg-dl-surface-2" />
                  <Skeleton className="h-[30px] w-[86px] rounded-md bg-dl-surface-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
