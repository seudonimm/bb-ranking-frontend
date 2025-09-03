import { createFileRoute } from '@tanstack/react-router'

import PlayerDetails from '../../screens/PlayerDetails';

export const Route = createFileRoute('/player/$steamID')({
  component: RouteComponent,
  loader:({params}) => {
    return params;
  }
});

function RouteComponent() {
  const {steamID} = Route.useParams();
  return <PlayerDetails steamID={steamID}/>
}
