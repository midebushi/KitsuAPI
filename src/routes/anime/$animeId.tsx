import { createFileRoute } from '@tanstack/react-router'
import Media from '../../Components/Media';

export const Route = createFileRoute('/anime/$animeId')({
  component: AnimeRouteComponent,
})

function AnimeRouteComponent() {
  const { animeId } = Route.useParams()
  return <Media mediaType='anime' mediaId={animeId}/>
}
