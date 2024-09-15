import { NavigationBar } from '@/components/Admin/AdminNavigation'
import Search from '@/components/Search'
import { PropertyCard } from '@/components/TransferCard/PropertyCard'
import { UserCard } from '@/components/TransferCard/UserCard'
import React from 'react'
import { FaSearch } from 'react-icons/fa'


export default function TransferProperty() {

  const [query, setQuery] = React.useState('')

  return (
    <>
      <div className='container mx-auto lg:mt-[60px]'>
        <div className='flex justify-end items-center w-full px-4 rounded-full'>
            <Search
              key={"1"}
              setQuery={() => {
                console.log("query")
              }}
              query={query}
              placeholder={"Enter The User Name"}
              type={"text"}
              value={query}
              id={"1"}
            />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <UserCard />
          <PropertyCard />
          <UserCard />
        </div>
      </div>
    </>
  )
}

