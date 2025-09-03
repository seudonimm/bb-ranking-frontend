import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { inject } from "@vercel/analytics";


import { RouterProvider, createRouter } from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';

const router = createRouter({
  routeTree,
  scrollToTopSelectors:['#root']
});

declare module '@tanstack/react-router'{
  interface Register{
    router: typeof router
  }
};


inject();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
