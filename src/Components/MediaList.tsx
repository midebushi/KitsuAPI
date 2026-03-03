import React from "react"

interface CategoryProps<T> {
    data: T[] | undefined,
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    renderItem: (item: T) => React.ReactNode, 
    renderSkeleton: () => React.ReactNode,
    skeletonCount?: number,
}


const MediaList = <T,>({
    data,
    isLoading,
    isError,
    error,
    renderItem,
    renderSkeleton,
    skeletonCount = 1
}: CategoryProps<T>) => {
    
  return (
    <div className="flex flex-col gap-5 w-full relative group">
        <div className="relative w-full">
            <ul className="flex flex-wrap gap-2 w-full pb-7 justify-between">
                {isLoading && 
                    Array.from({ length: skeletonCount || 10}).map((_, index) => (
                        <React.Fragment key={index}>
                            {renderSkeleton()}
                        </React.Fragment>
                    ))
                }
                {isError && <p className='text-theme-attention'>Error: {error?.message}</p>}
                {(!data || data.length) === 0 && <p>Not found</p>}

                {data?.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderItem(item)}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default MediaList
