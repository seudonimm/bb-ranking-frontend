import { createFileRoute } from '@tanstack/react-router'
import Ranking from '../screens/Ranking'
import '../App.css';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Ranking/>
}
