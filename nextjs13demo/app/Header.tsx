import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-evenly bg-blue-600 p-5'>
      <Link href={"/"} className={"bg-white text-blue-700 rounded-lg px-2 py-1"}>Home</Link>
      <Link href={"/todos"} className={"bg-white text-blue-700 rounded-lg px-2 py-1"}>Todos</Link>
      <Link href={"/search"} className={"bg-white text-blue-700 rounded-lg px-2 py-1"}>Search</Link>
      </div>
  )
}

export default Header