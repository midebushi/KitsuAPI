import { createFileRoute, Link } from '@tanstack/react-router'
import Category from '../Components/Category'
import Card from '../Components/Card'
import { useTrendingAnime } from '../hooks/useAnime'
import Skeleton from '../Components/Skeleton'
import { useTrendingManga } from '../hooks/useManga'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const animeQuery = useTrendingAnime()
  const mangaQuery = useTrendingManga()

  return <div className='m-auto size-fit overflow-x-hidden w-425'>
    <Category
      link='/anime'
      title='Trending Anime'
      data={animeQuery.data}
      isLoading={animeQuery.isLoading}
      isError={animeQuery.isError}
      error={animeQuery.error}
      renderItem={(item) => (
        <Link to='/anime/$animeId' params={{ animeId: item.id }}>
          <Card item={item} />
        </Link>
      )}
      renderSkeleton={() => <Skeleton className='w-[192px] h-[252px]' />}
      skeletonCount={8}
    />
    <Category
      link='/manga'
      title='Manga'
      data={mangaQuery.data}
      isLoading={mangaQuery.isLoading}
      isError={mangaQuery.isError}
      error={mangaQuery.error}
      renderItem={(item) => (
        <Link to='/manga/$mangaId' params={{ mangaId: item.id}}>
          <Card item={item} />
        </Link>
      )}
      renderSkeleton={() => <Skeleton className='w-[192px] h-[252px]' />}
      skeletonCount={8}
    />
    
  </div>
}
