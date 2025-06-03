import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex h-12 bg-blue-950 text-white font-bold justify-around items-center sticky top-0 z-20'>
        <div className='max-[480px]:text-[16px] text-xl'>
            <span className='text-green-700'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-700'>Guard/&gt;</span>
        </div>
        <button className='flex gap-1 items-center cursor-pointer'>
            <lord-icon
                className='flex'
                src="https://cdn.lordicon.com/jjxzcivr.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#ffffff,secondary:#109121"
                style={{width:'40px',height:'40px'}}>
            </lord-icon>
            <span className='max-[480px]:hidden'>Github</span>
        </button>
    </nav>
  )
}

export default Navbar
