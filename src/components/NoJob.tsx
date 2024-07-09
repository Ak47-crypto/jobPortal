import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { useAppContext } from '@/context/SiteContext'
function NoJob() {
    const {setStateValue}=useAppContext();
  return (
    <div className='flex justify-center flex-col space-y-4'>
        
            <Image
                src={"/nojob.png"}
                width={300}
                height={250}
                alt='no job image'
                className='m-auto'
            />
            
            <span className='font-bold text-center '>No luck? No problem!</span>
            <span className=''>Didn't find the results you are looking for in Live opportunities? Explore all opportunities, happy exploring!</span>
            <div className='w-full flex justify-center '>
            <Button className='bg-white text-blue-400 border hover:bg-white' onClick={()=>setStateValue('')}>Explore all</Button>
            </div>
    </div>
  )
}

export default NoJob