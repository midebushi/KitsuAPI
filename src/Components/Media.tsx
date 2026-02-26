import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FaStar } from "react-icons/fa";

import Tag from './Tag';
import Skeleton from './Skeleton';

interface MediaProps {
    mediaType: 'manga' | 'anime',
    mediaId: string,
}

const Media = ({ mediaType, mediaId}: MediaProps) => {

    const [ isExpanded, setIsExpanded ] = useState(false)
    const { data, isLoading, isError } = useQuery({
        queryKey: [mediaType, mediaId],
        queryFn: async () => {
        const res = await fetch(`https://kitsu.io/api/edge/${mediaType}/${mediaId}?include=categories`)

        if (!res.ok) throw new Error('Failed to load page.')
            const json = await res.json()

        return json
        }
    })

    const item = data?.data
    const categories = data?.included?.filter((item: any) => item.type === 'categories') || []

    if (isLoading) {
        return (
        <Skeleton className='w-[1504px] h-[340px] m-auto'></Skeleton>
        )
    }

    if (isError) {
        return (
        <p className='text-theme-attention'>Something went wrong!</p>
        )
    }
    return <>
        <div 
            className={`absolute top-16 bottom-5 left-0 w-full h-80 bg-cover bg-no-repeat bg-center`} 
            style={{
                backgroundImage: `url(${item?.attributes?.coverImage?.original})`
            }}>
                <div className='bg-black relative w-full h-full opacity-50'></div>
        </div>
        <div className='w-full h-full relative z-10 top-55'>
        <div className="container mx-auto p-4 w-425">
            <div className="flex flex-col md:flex-row gap-8">
            <img 
                src={item.attributes?.posterImage?.large || item.attributes?.posterImage?.small} 
                alt={item.attributes?.canonicalTitle}
                className="w-60 h-max rounded-xl shadow-lg"
            />
            
            <div className="flex flex-col gap-4">
                <div className='relative bottom-0'>
                <span className='flex items-center gap-5 text-4xl font-bold'>
                    <h1 className=" text-white">
                    {item?.attributes?.canonicalTitle}
                    </h1>
                    <p className='text-theme-text-secondary'>
                    {item?.attributes?.titles?.ja_jp}
                    </p>
                </span>
                <div className='flex items-center gap-5 py-1'>
                    <p className='text-theme-text-secondary text-xl'>{item?.attributes?.createdAt.substring(0, 4)}</p>
                    <p className='text-xl text-theme-text-secondary'>{item?.attributes?.status.toUpperCase()}</p>

                    <div className='flex items-center gap-1 text-theme-text-secondary'>
                    <FaStar className='text-amber-300'/>
                    <p className=''>{item?.attributes?.averageRating || 'None'}</p>
                    </div>
                </div>
                </div>
                <span className='py-2 rounded-xl'>
                <p className={`text-theme-text-primary/70  ${!isExpanded ? 'line-clamp-3' : ''}`}>
                    {item?.attributes?.synopsis}
                </p>
                <button onClick={() => setIsExpanded(!isExpanded)} className='hover:cursor-pointer text-theme-attention'>
                    {isExpanded ? 'Hide' : 'Read all'}
                </button>
                </span>
                <ul className='flex flex-wrap gap-2 '>
                {categories.map((category: any) => (
                    <Tag className='' name={category.attributes.title}/>
                ))}
                </ul>
            </div>
            </div>
        </div>
        </div>
        
    </>

}


export default Media
