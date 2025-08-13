import './App.css'
import Ranking from './screens/Ranking';

import { 
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Ranking/>
    </QueryClientProvider>
  )
}

export default App
