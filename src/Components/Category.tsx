import { Link } from "@tanstack/react-router"
import { AiOutlineLoading } from "react-icons/ai"
import React from "react"
import { type FileRoutesByTo } from "../routeTree.gen"


interface CategoryProps<T> {
    title: string;
    data: T[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    renderItem: (item: T) => React.ReactNode; 
    link: keyof FileRoutesByTo | (string & {});
}

const Category = <T,>({
    title,
    data,
    isLoading,
    isError,
    error,
    renderItem,
    link,
}: CategoryProps<T>) => {
    
  return (
    <div className="flex flex-col gap-5 size-fit ">
        <div className="flex justify-between">
            <Link className='text-theme-text-primary text-2xl font-bold size-fit' to={link as any}>{title}</Link>
            <Link className="text-theme-text-primary opacity-50 hover:underline" to={link as any}>Show more</Link>
        </div>
        <ul className="flex gap-5 overflow-hidden w-440 p-2 pb-7">
        {isLoading && <AiOutlineLoading className='animate-spin text-theme-text-primary'/>}
        {isError && <p className='text-theme-attention'>Error: {error?.message}</p>}
        {(!data || data.length) === 0 && <p>Not found</p>}

        {data?.map((item, index) => (
            <React.Fragment key={index}>
                {renderItem(item)}
            </React.Fragment>
        ))}
        </ul>
    </div>
  )
}

export default Category
