import { createFileRoute, Link } from '@tanstack/react-router'
import Category from '../Components/Category'
import Card from '../Components/Card'
import { useAnimeQuery } from '../hooks/useAnime'
import Skeleton from '../Components/Skeleton'
import { useMangaQuery } from '../hooks/useManga'

import { type Anime } from '../api/anime'
import { type Manga } from '../api/manga'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const animeQuery = useAnimeQuery()
  const mangaQuery = useMangaQuery()

  const firstPageAnime = animeQuery.data?.pages?.[0] || []
  const firstPageManga = mangaQuery.data?.pages?.[0] || []


  return <div className='m-auto size-fit overflow-x-hidden w-425'>
    <div>
      <Category
        link='/anime'
        title='Trending Anime'
        data={firstPageAnime}
        isLoading={animeQuery.isLoading}
        isError={animeQuery.isError}
        error={animeQuery.error}
        renderItem={(item: Anime) => (
          <Link to='/anime/$animeId' params={{ animeId: item.id }}>
            <Card item={item} />
          </Link>
        )}
        renderSkeleton={() => <Skeleton className='min-w-[192px] h-[252px]' />}
        skeletonCount={8}
      />
      <Category
        link='/manga'
        title='Manga'
        data={firstPageManga}
        isLoading={mangaQuery.isLoading}
        isError={mangaQuery.isError}
        error={mangaQuery.error}
        renderItem={(item: Manga) => (
          <Link to='/manga/$mangaId' params={{ mangaId: item.id}}>
            <Card item={item} />
          </Link>
        )}
        renderSkeleton={() => <Skeleton className='min-w-[192px] h-[252px]' />}
        skeletonCount={8}
      />
    </div>
    
  </div>
}
