import { createFileRoute } from '@tanstack/react-router'
import Media from '../../Components/Media';

export const Route = createFileRoute('/manga/$mangaId')({
  component: MangaRouteComponent,
})

function MangaRouteComponent() {
  const { mangaId } = Route.useParams()
  return <Media mediaType='manga' mediaId={mangaId}/>
}