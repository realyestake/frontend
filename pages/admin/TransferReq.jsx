
import { HeaderNavigation } from '@/components/HeaderNavigation'
import { PropertyCard } from '@/components/TransferCard/PropertyCard'
import { UserCard } from '@/components/TransferCard/UserCard'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`min-h-screen items-center justify-between bg-[#160019] py-24 px-10 ${inter.className}`}
    >
      <div className='flex flex-col text-start w-full h-full rounded-2xl'>
        <HeaderNavigation title={'New Transfer Request from John Doe for PineApt'} showBackButton={true} />
      </div>
      <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center w-full h-full rounded-2xl'>
        <div className='w-full hidden md:block lg:block xl:block 2xl:block'>
          <UserCard />
        </div>
        <PropertyCard />
        <UserCard />
        <div className="lg:hidden xl:hidden 2xl:hidden md:hidden block mb-0 my-5">
          <div className="rounded-full bg-white/20 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
        </div>
        <div className='block md:hidden lg:hidden xl:hidden 2xl:hidden'>
          <UserCard />
        </div>
      </div>
    </main>
  )
}
