import { createFileRoute } from '@tanstack/react-router'
import { IoSearch } from 'react-icons/io5'
import { Link } from '@tanstack/react-router'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'


import { useAnimeQuery  } from '../../hooks/useAnime'
import MediaList from '../../Components/MediaList'
import Card from '../../Components/Card'
import Skeleton from '../../Components/Skeleton'
import Sidebar from '../../Components/Sidebar'
import { useDebounce } from '../../hooks/useDebounce'

export const Route = createFileRoute('/anime/')({
  component: RouteComponent,
})

function RouteComponent() {

  const [ searchValue, setSearchValue ] = useState('')
  const debouncedSearch = useDebounce(searchValue, 500)

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAnimeQuery(debouncedSearch)

  const { ref, inView } = useInView()
  
  useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
      }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allAnime = data?.pages.flatMap((page) => page) || []

  
  return <div className='flex mx-auto w-425 my-10 flex-row gap-8'>
    <div className='mx-auto flex-4 w-full'>
      <div className='px-5'>
        <h2 className='text-theme-text-primary font-bold text-3xl'>
          {debouncedSearch ? `Search results for "${debouncedSearch}"` : `Search in anime`}
        </h2>
        <div className="relative w-full my-4">
          <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none w-10 text-theme-text-primary opacity-50'>
            <IoSearch className="text-xl" />
          </div>
          <input 
            type="text" 
            placeholder="Naruto Shippuden"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-theme-background text-theme-text-primary p-3 rounded pl-10 focus:outline-0 w-full"
          />

        </div>
      </div>
      <div className=''>
        <MediaList
          data={allAnime}
          isLoading={isLoading}
          isError={isError}
          error={error}
          renderItem={(item) => (
            <Link key={item.id} to='/anime/$animeId' params={{ animeId: item.id }}>
              <Card item={item} />
            </Link>
          )}
          renderSkeleton={() => <Skeleton className='min-w-[192px] h-[252px] px-2 my-3' />}
          skeletonCount={20}
        />
        <div ref={ref} className='w-full h-10 flex justify-center items-center mt-4'></div>
      </div>
    </div>
    <Sidebar />
  </div>
}
