import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manga/"!</div>
}
