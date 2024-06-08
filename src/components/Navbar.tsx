'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
function Navbar() {
    const [isActive, setIsActive] = useState<number | null>(null)
    const navLinks = [
        {
            name: "Find work"
        },
        {
            name: "Applications"
        },
        {
            name: "Post a job"
        }
    ]
    const handleActiveState = (index: number) => {
        setIsActive(index)
    }
    return (
        <nav>
            <div className='flex justify-between px-[155px] py-[41px]'>
                <div id='logo' className='py-5 px-5'>
                    <h1 className='text-[40px] '>jobPortal</h1>
                </div>
                
                    <ul className='flex gap-6 items-center justify-center px-5 py-5'>
                        {
                            navLinks.map((obj, index) => (
                                <li key={index}
                                    className={`${isActive === index ? "text-slate-400" : "text-slate-700"} hover:cursor-pointer`}
                                    onClick={() => handleActiveState(index)}
                                >
                                    {obj.name}
                                </li>
                            ))
                        }
                    </ul>
                
                <div id='button' className='flex items-center py-5 px-5'>
                    <Button className='rounded-xl'>Login</Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar