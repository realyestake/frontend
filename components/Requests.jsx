import { Inter } from 'next/font/google'
import { UserCard } from './Card/UserCard'
import { SearchBox } from './HomePage/SearchBar/SearchBox'
import ToggleSwitch from './Buttons/ToggleButton'
import { SecondaryButton } from './Buttons/SecondaryButton'
const inter = Inter({ subsets: ['latin'] })

export default function Requests() {
  return (
    <main
      className={`flex min-h-screen  flex-col bg-[#160019] py-24 px-12 ${inter.className}`}
    >
      <SearchBox />
      <div className='justify-between flex flex-row items-end'>
        <ToggleSwitch />
        <SecondaryButton className={'border-none text-[#C732FF] normal-case flex flex-row gap-2 hover:bg-[#C732FF] hover:text-white'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add User
        </SecondaryButton>
      </div>
      <div className=' items-center justify-between'>
        <div className='flex flex-row gap-4'>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <div className='flex flex-row gap-4'>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <div className='flex flex-row gap-4'>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <div className='flex flex-row gap-4'>
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </main>
  )
}
