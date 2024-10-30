import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <Skeleton className="h-10 w-10 rounded" /> {/* Para la imagen */}
          <Skeleton className="h-4 w-40" /> {/* Para el nombre de la canción */}
          <Skeleton className="h-4 w-32" /> {/* Para el nombre del artista */}
        </div>
      ))}
    </div>
  );
}