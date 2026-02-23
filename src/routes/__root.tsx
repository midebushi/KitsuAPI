import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Toast from '../Components/Toast'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
        <div className='flex flex-col min-h-screen bg-theme-background-secondary'>
          <Header/>
          <main className='flex-1 bg-theme-background-secondary flex items-center px-20'>
            <Outlet />
          </main>
          <Footer/>
          <Toast />
        </div>
    </React.Fragment>
  )
}
