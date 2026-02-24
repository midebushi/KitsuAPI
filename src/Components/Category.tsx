import { Link } from "@tanstack/react-router"
import React, { useRef } from "react"
import { type FileRoutesByTo } from "../routeTree.gen"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import SliderButton from "./Buttons/SliderButton"

interface CategoryProps<T> {
    title: string,
    data: T[] | undefined,
    isLoading: boolean,
    isError: boolean,
    error: Error | null,
    renderItem: (item: T) => React.ReactNode, 
    link: keyof FileRoutesByTo | (string & {}),
    renderSkeleton: () => React.ReactNode,
    skeletonCount?: number,
}


const Category = <T,>({
    title,
    data,
    isLoading,
    isError,
    error,
    renderItem,
    link,
    renderSkeleton,
    skeletonCount = 1
}: CategoryProps<T>) => {

    const scrollRef = useRef<HTMLUListElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8

            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }
    
  return (
    <div className="flex flex-col gap-5 w-full relative group">
        <div className="flex justify-between">
            <Link className='text-theme-text-primary text-2xl font-bold size-fit' to={link as any}>{title}</Link>
            <Link className="text-theme-text-primary opacity-50 hover:underline" to={link as any}>Show more</Link>
        </div>
        <div className="relative w-full">
            <SliderButton onClick={() => scroll('left')} direction="left">
                <AiOutlineLeft className="text-xl" />
            </SliderButton>
            <ul className="flex gap-2 w-full p-2 pb-7 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={scrollRef}>
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
            <SliderButton onClick={() => scroll('right')} direction='right'>
                <AiOutlineRight className="text-xl" />
            </SliderButton>
        </div>
    </div>
  )
}

export default Category
