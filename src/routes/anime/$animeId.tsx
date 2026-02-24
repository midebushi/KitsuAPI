import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Skeleton from '../../Components/Skeleton'


export const Route = createFileRoute('/anime/$animeId')({
  component: RouteComponent,
})

function RouteComponent() {

  const [ isExpanded, setIsExpanded ] = useState(false)
  const { animeId } = Route.useParams()
  const { data: anime, isLoading, isError } = useQuery({
    queryKey: ['anime', animeId],
    queryFn: async () => {
      const res = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`)

      if (!res.ok) throw new Error('Failed to load page.')
        const json = await res.json()

      return json.data
    }
  })

  if (isLoading) {
    return (
      <Skeleton className='w-[1504px] h-[340px]'></Skeleton>
    )
  }

  if (isError) {
    return (
      <p className='text-theme-attention'>Something went wrong!</p>
    )
  }
  return <div>
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img 
          src={anime.attributes?.posterImage?.large || anime.attributes?.posterImage?.small} 
          alt={anime.attributes?.canonicalTitle}
          className="w-60 h-max rounded-xl shadow-lg"
        />
        
        <div className="flex flex-col gap-4">
          <span className='flex items-center gap-5 text-4xl font-bold'>
            <h1 className=" text-theme-text-primary">
              {anime?.attributes?.canonicalTitle}
            </h1>
            <p className='text-theme-text-primary opacity-50'>
              {anime?.attributes?.titles?.ja_jp}
            </p>
          </span>
          <p className='text-theme-text-primary text-xl opacity-50'>{anime?.attributes?.createdAt.substring(0, 4)}</p>
          <span className='p-4 rounded-xl'>
            <p className={`text-theme-text-primary/70  ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {anime?.attributes?.synopsis}
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)} className='hover:cursor-pointer text-theme-attention'>
              {isExpanded ? 'Hide' : 'Read all'}
            </button>
          </span>

          <div className="flex gap-4 mt-4">
             <span className="bg-theme-accent text-white px-4 py-2 rounded-lg font-bold">
               Рейтинг: {anime?.attributes?.averageRating || 'Хуй знает'}
             </span>
             <span className="bg-theme-background-secondary text-theme-text-primary px-4 py-2 rounded-lg font-bold">
               Статус: {anime?.attributes?.status}
             </span>
          </div>
        </div>
      </div>
    </div>
  </div>
}
