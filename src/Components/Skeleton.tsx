
interface SkeletonProps {
    className?: string,
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-theme-text-primary/10 rounded-xl ${className}`}>
        
    </div>
  )
}

export default Skeleton
