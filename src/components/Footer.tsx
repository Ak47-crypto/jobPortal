"use client"
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
function Footer() {
const path=usePathname()
if(path.startsWith("/dashboard")||path.startsWith("/sign-up")||path.startsWith("/admin-login"))
  return null;
  return (
    <footer className=''>
         <section id='footer'>
          

          {/* footer end */}
          <div className='h-full md:h-[634px] bg-slate-200'>
            <div className='flex justify-center  px-4 md:px-20'>
              <div className='w-full md:w-[1170px]'>
                <div className='flex mt-[72px] items-center md:justify-between md:flex-row gap-5 flex-col mb-[64px]'>
                  <p className='text-2xl leading-normal  md:text-[40px] text-black text-center  md:text-start'>Jobs for UnSkilled Youth.<br/>No Experience? No Problem</p>
                 
                </div>
                <Separator className='bg-black'/>
                {/* second section */}
                <div className='mt-[64px] flex justify-between'>
                  <div className='w-[300px] leading-8 '>
                    <p className='text-black opacity-70 text-[34px] mb-[32px]'>JobPortal</p>
                    <p className='text-black  text-[18px] mb-[32px]'>Connecting hard workers with local opportunities. Your path to reliable employment and fair wages.</p>
                    <p className='text-black hidden md:block text-[16px]'>All rights reserved. © 2024 JobPortal</p>
                  </div>
                  <div className='w-[505px] '>
                    <div className='flex justify-between items-center'>
                      <ul className='text-black leading-10'>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Blog</li>
                        <li>Story</li>
                      </ul>
                      <ul className='text-black leading-10'>
                        <li>Company</li>
                        <li>Product</li>
                        <li>Press</li>
                        <li>More</li>
                      </ul>
                      <ul className='text-black leading-10'>
                        <li>Press</li>
                        <li>Careers</li>
                        <li className='text-wrap'>News</li>
                        <li>More</li>
                      </ul>
                    </div>

                  </div>
                  
                </div>

              </div>
            </div>
            <p className='text-black text-center md:hidden'>All rights reserved.</p>
          </div>
          
        </section>

    </footer>
  )
}

export default Footer