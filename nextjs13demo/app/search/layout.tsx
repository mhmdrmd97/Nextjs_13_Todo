import React from 'react'
import Search from './Search'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main className='flex space-x-4 divide-x-2 p-5'>
        <div><h1>Search</h1></div>
        <div>
            <Search />
          {children}
          </div>
        </main>

    )
  }
  